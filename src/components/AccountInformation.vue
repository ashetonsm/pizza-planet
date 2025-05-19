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
        return { menuStore, auth }
    },
    data() {
        return {
            loading: true,
        }
    },
    async mounted() {
        if (this.auth.currentUser !== null) {
            this.fetchData
        }
    },
    methods: {
        signOut() {
            this.menuStore.signOut();
            this.$router.push({name: 'login'});
        },
    },
    computed: {
        fetchData() {
            // Check for currentUser first to avoid error message in console on sign out.
            if (this.auth.currentUser) {
                this.menuStore.setAdminStatus()
                this.loading = false
                if (!this.loading) {
                    this.menuStore.setOrdersRef(this.auth.currentUser!.uid)
                    return this.menuStore.getAdminStatus
                } else {
                    return false
                }
            } else {
                return false
            }
        }
    }
}
</script>
<template>
    <h1 v-if="loading">LOADING</h1>
    <v-container v-else="!loading">
        <v-container class="d-flex">
            <v-card class="d-flex mx-auto px-6" :title=auth.currentUser?.email?.toString()>
                <v-divider vertical></v-divider>
                <v-btn class="ml-5 my-auto" variant="tonal" @click="signOut()">Sign Out</v-btn>
            </v-card>
        </v-container>

        <v-container class="d-flex">
            <v-card class="mx-auto px-6 text-center" title="Order History" v-if="!fetchData">
                <OrderHistory></OrderHistory>
            </v-card>
                <AdminInformation v-else="fetchData"></AdminInformation>
        </v-container>

    </v-container>

</template>
