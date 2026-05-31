/**
 * Mesure de performance de la mosaique de villageois sous throttle CPU.
 *
 * Objectif : disposer d'une baseline chiffree et reproductible AVANT/APRES une
 * optimisation (virtualisation, content-visibility, v-memo...). On rejoue le
 * meme script et on compare les chiffres.
 *
 * Ce qui est mesure, par niveau de throttle CPU (x1 desktop, x6 mobile approx) :
 *   - Noeuds DOM         : taille du DOM rendu (proxy du cout de la liste)
 *   - Montage initial    : temps navigation -> 391 cartes presentes (one-shot)
 *   - Long tasks montage : taches > 50ms pendant le montage (blocage UI)
 *   - Re-render filtre   : temps d'un changement de filtre (clic -> 204 cartes)
 *   - Long tasks filtre  : blocage UI pendant le re-render
 *   - Scroll FPS         : fluidite d'un scroll anime sur la liste complete
 *   - Heap JS            : memoire utilisee
 *
 * PREREQUIS : un serveur servant le BUILD DE PROD (pas le dev, qui fausse les
 * mesures avec HMR/devtools). Workflow complet :
 *
 *   1. pnpm build
 *   2. pnpm preview --port 4173   # dans un terminal a part (laisser tourner)
 *   3. node tests/perf/mosaique-perf.mjs
 *   4. arreter le serveur preview (Ctrl-C, ou: fuser -k 4173/tcp)
 *
 * VARIABLES D'ENVIRONNEMENT (optionnelles) :
 *   PERF_URL    URL a mesurer            (defaut: http://localhost:4173)
 *   CPU_RATES   facteurs de throttle CPU (defaut: "1,6" ; ex: "1,4,6")
 *
 * Exemple : CPU_RATES=1,4,6 PERF_URL=http://localhost:4173 \
 *             node tests/perf/mosaique-perf.mjs
 *
 * NB : ce n'est pas un test CI (ne matche pas *.spec.ts, donc ignore par
 * `playwright test`). C'est un outil de mesure ad hoc, lance a la main.
 */
import { chromium } from '@playwright/test'

const BASE = process.env.PERF_URL || 'http://localhost:4173'
const RATES = (process.env.CPU_RATES || '1,6').split(',').map(Number)
const TOTAL = 391
const FILTERED = 204 // genre = Male

async function runOnce(rate) {
  const browser = await chromium.launch()
  const context = await browser.newContext({ locale: 'fr-FR' })
  const page = await context.newPage()

  // Collecte des long tasks (> 50ms) tout au long de la session
  await page.addInitScript(() => {
    window.__lt = []
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) window.__lt.push(e.duration)
    }).observe({ entryTypes: ['longtask'] })
  })

  const client = await context.newCDPSession(page)
  await client.send('Emulation.setCPUThrottlingRate', { rate })

  // 1) Montage initial : navigation -> 391 cartes presentes
  const t0 = Date.now()
  await page.goto(BASE, { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(
    n => document.querySelectorAll('.mosaique .villager-card').length === n,
    TOTAL,
    { timeout: 60000 },
  )
  const mountMs = Date.now() - t0

  const domNodes = await page.evaluate(() => document.querySelectorAll('*').length)
  const ltLoad = await page.evaluate(() => {
    const a = window.__lt
    return { count: a.length, totalMs: Math.round(a.reduce((s, d) => s + d, 0)) }
  })

  // 2) Re-render au filtrage : clic "Male" -> 204 cartes
  await page.evaluate(() => { window.__lt.length = 0 })
  const tf = Date.now()
  await page.getByText(/^(Mâle|Male)$/).click()
  await page.waitForFunction(
    n => document.querySelectorAll('.mosaique .villager-card').length === n,
    FILTERED,
    { timeout: 30000 },
  )
  const filterMs = Date.now() - tf
  const ltFilter = await page.evaluate(() => {
    const a = window.__lt
    return { count: a.length, totalMs: Math.round(a.reduce((s, d) => s + d, 0)) }
  })

  // remet tous les villageois pour mesurer le scroll sur la liste complete
  await page.getByRole('button', { name: /^(Réinitialiser|Reset)$/ }).click()
  await page.waitForFunction(
    n => document.querySelectorAll('.mosaique .villager-card').length === n,
    TOTAL,
    { timeout: 30000 },
  )

  // 3) FPS au scroll (best effort) : scroll anime sur ~1.5s du conteneur scrollable
  const scroll = await page.evaluate(async () => {
    let el = document.querySelector('.mosaique')
    while (el && el !== document.body) {
      const s = getComputedStyle(el)
      if (/(auto|scroll)/.test(s.overflowY) && el.scrollHeight > el.clientHeight + 50)
        break
      el = el.parentElement
    }
    const sc = el && el !== document.body ? el : document.scrollingElement
    const max = sc.scrollHeight - sc.clientHeight
    if (max < 50)
      return null
    const frames = []
    let last = performance.now()
    const start = last
    await new Promise((resolve) => {
      function step(now) {
        frames.push(now - last)
        last = now
        const p = Math.min(1, (now - start) / 1500)
        sc.scrollTop = max * p
        if (now - start < 1500)
          requestAnimationFrame(step)
        else resolve()
      }
      requestAnimationFrame(step)
    })
    const d = frames.slice(1)
    const avg = d.reduce((s, x) => s + x, 0) / d.length
    return {
      fps: Math.round(1000 / avg),
      avgFrameMs: +avg.toFixed(1),
      worstFrameMs: Math.round(Math.max(...d)),
      jankFrames: d.filter(x => x > 1000 / 50).length,
      totalFrames: d.length,
    }
  })

  const heapMB = await page.evaluate(
    () => (performance.memory ? +(performance.memory.usedJSHeapSize / 1048576).toFixed(1) : null),
  )

  await browser.close()
  return { rate, mountMs, domNodes, ltLoad, filterMs, ltFilter, scroll, heapMB }
}

function line(label, value) {
  return `  ${label.padEnd(34)} ${value}`
}

const results = []
for (const rate of RATES)
  results.push(await runOnce(rate))

console.log(`\n=== Mosaique perf (${TOTAL} cartes) — ${BASE} ===`)
for (const r of results) {
  console.log(`\n-- CPU throttle x${r.rate} ${r.rate === 1 ? '(desktop)' : '(mobile approx)'} --`)
  console.log(line('Noeuds DOM total', r.domNodes))
  console.log(line('Noeuds / carte (approx)', (r.domNodes / TOTAL).toFixed(1)))
  console.log(line('Montage initial -> 391 cartes', `${r.mountMs} ms`))
  console.log(line('Long tasks au montage', `${r.ltLoad.count} (cumul ${r.ltLoad.totalMs} ms)`))
  console.log(line('Re-render filtre -> 204', `${r.filterMs} ms`))
  console.log(line('Long tasks au filtrage', `${r.ltFilter.count} (cumul ${r.ltFilter.totalMs} ms)`))
  if (r.scroll) {
    console.log(line('Scroll FPS moyen', `${r.scroll.fps} fps (frame moy ${r.scroll.avgFrameMs} ms)`))
    console.log(line('Pire frame / frames janky', `${r.scroll.worstFrameMs} ms / ${r.scroll.jankFrames} sur ${r.scroll.totalFrames}`))
  }
  else {
    console.log(line('Scroll FPS', 'conteneur non scrollable detecte'))
  }
  if (r.heapMB != null)
    console.log(line('Heap JS utilisee', `${r.heapMB} MB`))
}
console.log('')
