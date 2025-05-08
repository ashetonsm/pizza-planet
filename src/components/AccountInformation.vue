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
    <v-container>

        <Login v-if="menuStore.currentUser === null"></Login>

        <v-container class="d-flex" v-else-if="menuStore.currentUser !== null">
            <v-card class="d-flex mx-auto px-6" :title=menuStore.currentUser!.email?.toString()>
                <v-divider vertical></v-divider>
                <v-btn class="ml-5 my-auto" variant="tonal" @click="signOut()">Sign Out</v-btn>
            </v-card>
        </v-container>

        <v-container class="d-flex" v-if="menuStore.admin === true">
            <Admin></Admin>
        </v-container>

        <v-container class="d-flex" v-if="menuStore.admin === false && menuStore.currentUser !== null">
            <v-card class="d-flex mx-auto px-6" title="Order History">
                <OrderHistory></OrderHistory>
            </v-card>
        </v-container>

    </v-container>

</template>
