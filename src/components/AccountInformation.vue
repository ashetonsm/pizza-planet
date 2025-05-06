<script lang="ts">
import { useMenuStore } from '@/stores/store';
import Admin from './Admin.vue';
import Login from './Login.vue';
import OrderHistory from './OrderHistory.vue';

export default {
    components: {
        Admin,
        Login,
        OrderHistory,
    },
    setup() {
        const menuStore = useMenuStore()
        return { menuStore }
    },
    methods: {
        signOut() {
            useMenuStore().signOut()
        }
    }
}
</script>
<template>
    <v-container fluid>
        <section v-if="menuStore.currentUser === null">
            <Login></Login>
        </section>
        <section v-else-if="menuStore.currentUser !== null">
            <p>Logged in as: {{ menuStore.currentUser?.email }}</p>
            <button type="button" class="btn_red" @click="signOut()">Sign Out</button>
            <section v-if="menuStore.admin === true">
                <Admin></Admin>
            </section>
            <section v-if="menuStore.admin === false">
                <OrderHistory></OrderHistory>
            </section>
        </section>

    </v-container>

</template>
