<template>
  <NConfigProvider v-if="hasError" :theme="darkTheme">
    <NLayout style="height: 100vh">
      <NLayoutHeader
        style="height: 64px; padding: 24px"
        bordered
        role="banner"
      >
        <div class="error-header">
          <NIcon size="24" color="red">
            <AlertCircle />
          </NIcon>
          ACNH Villagers - {{ t('error.boundaryTitle') }}
        </div>
      </NLayoutHeader>

      <NLayout position="absolute" style="top: 64px; bottom: 64px">
        <NLayout
          content-style="padding: 24px; display: flex; flex-direction: column; justify-content: center; align-items: center;"
          role="main"
        >
          <NAlert
            :title="t('error.boundaryTitle')"
            type="error"
            :show-icon="true"
            style="max-width: 600px;"
          >
            <NSpace vertical>
              <p>{{ t('error.boundaryMessage') }}</p>

              <div v-if="showDetails" class="error-details">
                <NCollapse>
                  <NCollapseItem :title="t('error.technicalDetails')" name="details">
                    <pre class="error-stack">{{ errorDetails }}</pre>
                  </NCollapseItem>
                </NCollapse>
              </div>

              <NSpace>
                <NButton
                  type="primary"
                  :loading="isReloading"
                  @click="reloadPage"
                >
                  {{ t('error.reload') }}
                </NButton>

                <NButton
                  v-if="isRecoverable && !hasTriedRecovery"
                  type="default"
                  :loading="isRecovering"
                  @click="attemptRecovery"
                >
                  {{ t('error.tryRecover') }}
                </NButton>

                <NButton
                  text
                  @click="toggleDetails"
                >
                  {{ showDetails ? t('error.hideDetails') : t('error.showDetails') }}
                </NButton>
              </NSpace>
            </NSpace>
          </NAlert>

          <div v-if="autoRecoveryCountdown > 0" class="auto-recovery">
            <NProgress
              type="line"
              :percentage="((5 - autoRecoveryCountdown) / 5) * 100"
              :show-indicator="false"
            />
            <p>{{ t('error.autoRecovery', { seconds: autoRecoveryCountdown }) }}</p>
          </div>
        </NLayout>
      </NLayout>
    </NLayout>
  </NConfigProvider>
  <slot v-else />
</template>

<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next'
import {
  darkTheme,
  NAlert,
  NButton,
  NCollapse,
  NCollapseItem,
  NConfigProvider,
  NIcon,
  NLayout,
  NLayoutHeader,
  NProgress,
  NSpace,
} from 'naive-ui'
import { onErrorCaptured, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface ErrorInfo {
  error: Error
  errorInfo: string
  timestamp: number
  userAgent: string
  url: string
  component?: string
}

const { t } = useI18n()
const hasError = ref(false)
const isRecoverable = ref(false)
const hasTriedRecovery = ref(false)
const showDetails = ref(false)
const errorDetails = ref('')
const isReloading = ref(false)
const isRecovering = ref(false)
const autoRecoveryCountdown = ref(0)

let countdownTimer: number | null = null

const recoverableErrors = [
  'ChunkLoadError',
  'Loading chunk',
  'Loading CSS chunk',
  'NetworkError',
  'TypeError: Failed to fetch',
]

function isRecoverableError(error: Error): boolean {
  const errorMessage = error.message || error.toString()
  return recoverableErrors.some(pattern =>
    errorMessage.includes(pattern),
  )
}

function logErrorToService(errorInfo: ErrorInfo) {
  // En production, vous pourriez envoyer vers Sentry, LogRocket, etc.
  if (import.meta.env.PROD) {
    console.error('Error logged:', errorInfo)
    // fetch('/api/log-error', { method: 'POST', body: JSON.stringify(errorInfo) })
  }
}

function formatErrorDetails(error: Error, info: string): string {
  return `Error: ${error.name}
Message: ${error.message}
Stack: ${error.stack || 'No stack trace available'}
Component Info: ${info}
Timestamp: ${new Date().toISOString()}
User Agent: ${navigator.userAgent}
URL: ${window.location.href}`
}

function startAutoRecovery() {
  if (!isRecoverable.value)
    return

  autoRecoveryCountdown.value = 5
  countdownTimer = window.setInterval(() => {
    autoRecoveryCountdown.value--
    if (autoRecoveryCountdown.value <= 0) {
      attemptRecovery()
    }
  }, 1000)
}

function stopAutoRecovery() {
  if (countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
  autoRecoveryCountdown.value = 0
}

onErrorCaptured((err, instance, info) => {
  const errorInfo: ErrorInfo = {
    error: err,
    errorInfo: info,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    component: instance?.$?.type?.name || 'Unknown',
  }

  logErrorToService(errorInfo)

  errorDetails.value = formatErrorDetails(err, info)
  isRecoverable.value = isRecoverableError(err)
  hasError.value = true

  // Démarrer la récupération automatique pour les erreurs récupérables
  if (isRecoverable.value && !hasTriedRecovery.value) {
    startAutoRecovery()
  }

  return false
})

async function attemptRecovery() {
  isRecovering.value = true
  hasTriedRecovery.value = true
  stopAutoRecovery()

  try {
    // Attendre un peu avant de réessayer
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Nettoyer le cache du module si possible
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration) {
        await registration.update()
      }
    }

    // Réinitialiser l'état d'erreur
    hasError.value = false
    isRecoverable.value = false
    hasTriedRecovery.value = false
    showDetails.value = false
  }
  catch (recoveryError) {
    console.error('Recovery failed:', recoveryError)
  }
  finally {
    isRecovering.value = false
  }
}

function reloadPage() {
  isReloading.value = true
  stopAutoRecovery()

  // Nettoyer le localStorage si nécessaire
  try {
    localStorage.removeItem('vue-app-cache')
  }
  catch (e) {
    // Ignore localStorage errors
  }

  window.location.reload()
}

function toggleDetails() {
  showDetails.value = !showDetails.value
}

onUnmounted(() => {
  stopAutoRecovery()
})
</script>

<style scoped>
.error-header {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
}

.error-details {
  margin-top: 16px;
}

.error-stack {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  font-size: 12px;
  max-height: 200px;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.auto-recovery {
  margin-top: 24px;
  text-align: center;
  max-width: 300px;
}

.auto-recovery p {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}
</style>
