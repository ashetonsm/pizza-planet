<script lang="ts">
import Login from './Login.vue';
import Admin from './Admin.vue';
import { useMenuStore } from '@/stores/store';
import OrderHistory from '@/components/OrderHistory.vue';

export default {
    setup() {
        const menuStore = useMenuStore()
        return { menuStore }
    },
    methods: {
        signOut() {
            useMenuStore().signOut()
        },
        loadOrders() {
            console.log(`Setting orders`)
            useMenuStore().setOrdersRef()
        }
    }
}
</script>
<template>
    <div class="current_user_wrapper">
        <section v-if="menuStore.currentUser !== null">
            <p>Logged in as: {{ menuStore.currentUser?.email }}</p>
            <button type="button" class="btn_red" @click="signOut()">Sign Out</button>
            <button type="button" class="btn_green" @click="loadOrders()">Load Orders</button>
            <OrderHistory></OrderHistory>
        </section>
        <section v-if="menuStore.admin === true">
            <Admin></Admin>
        </section>
    </div>

    <section v-if="menuStore.currentUser == null">
        <Login />
    </section>
</template>
