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
import Register from './components/Register.vue'
import OrderHistory from './components/OrderHistory.vue'
import AccountInformation from '@/components/AccountInformation.vue';

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
app.component('Register', Register)
app.component('OrderHistory', OrderHistory)
app.component('AccountInformation', AccountInformation)

app.mount('#app')
