<script lang="ts">
import { useMenuStore } from '@/stores/store';
import OrderHistory from './OrderHistory.vue';
import { firebaseAuth } from '@/firebase';
import AdminInformation from './AdminInformation.vue';

export default {
    components: {
        OrderHistory,
        AdminInformation
    },
    setup() {
        const menuStore = useMenuStore()
        const auth = firebaseAuth
        if (auth.currentUser) {
            menuStore.setAdminsRef()
                .then(() => {
                    menuStore.setAdminStatus()
                })
                .then(() => {
                    menuStore.setOrdersRef(auth.currentUser!.uid)
                })
        }
        return { menuStore, auth }
    },
    methods: {
        signOut() {
            this.menuStore.signOut();
            this.$router.push({name: 'login'});
        }
    }
}
</script>
<template>
    <v-container>
        
        <v-container class="d-flex">
            <v-card class="d-flex mx-auto px-6" :title=auth.currentUser!.email?.toString()>
                <v-divider vertical></v-divider>
                <v-btn class="ml-5 my-auto" variant="tonal" @click="signOut()">Sign Out</v-btn>
            </v-card>
        </v-container>

        <v-container class="d-flex">
            <v-card class="mx-auto px-6 text-center" title="Order History" v-if="!menuStore.admin">
                <OrderHistory></OrderHistory>
            </v-card>
                <AdminInformation v-else="menuStore.admin"></AdminInformation>
        </v-container>

    </v-container>

</template>
