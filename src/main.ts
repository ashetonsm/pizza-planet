import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { firebaseApp } from './firebase'

import App from './App.vue'
import router from './router'
import { VueFire, VueFireAuth } from 'vuefire'
import Header from './components/Header.vue'
import Admin from './components/Admin.vue'
import Login from './components/Login.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueFire, {
    firebaseApp,
    modules: [
        VueFireAuth(),
    ]

})

app.component('Header', Header)
app.component('Admin', Admin)
app.component('Login', Login)

app.mount('#app')
