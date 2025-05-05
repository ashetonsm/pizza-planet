import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { firebaseApp } from './firebase'

import App from './App.vue'
import { getCurrentUser, VueFire, VueFireAuth } from 'vuefire'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './router/routes'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
router.beforeEach(async (to, from) => {
    const user = await getCurrentUser()
    if (to.meta.isProtected && !user) {
        return { name: 'forbidden' }
    }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueFire, {
    firebaseApp,
    modules: [
        VueFireAuth(),
    ]

})

app.mount('#app')
