import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { firebaseApp } from './firebase'

import App from './App.vue'
import { getCurrentUser, VueFire, VueFireAuth } from 'vuefire'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './router/routes'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import colors from 'vuetify/util/colors'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


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
const vuetify = createVuetify({
    components,
    directives,
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: colors.pink.darken4,
                    secondary: colors.pink.accent4,
                    background: "#E77697",
                    surface: colors.red.lighten4
                }
            },
            dark: {
                dark: true,
                colors: {
                    primary: colors.pink.darken4,
                    secondary: colors.pink.accent4,
                    background: "#510826",
                    surface: "#190208"
                }
            },
        },
    }
})
app.use(vuetify)

app.mount('#app')
