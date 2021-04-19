import {createRouter, createWebHistory} from 'vue-router'
import Home from './pages/Home.vue'
import Villager from './pages/Villager.vue'

const routerHistory = createWebHistory()

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/villager/:id',
            component: Villager
        }
    ]
})

export default router
