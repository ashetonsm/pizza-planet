<script lang="ts">
import Admin from './Admin.vue'
import AdminOrderHistory from './AdminOrderHistory.vue'
import { useMenuStore } from '@/stores/store'
import { firebaseAuth } from '@/firebase'

export default {
    name: 'AdminInformation',
    components: {
        Admin,
        AdminOrderHistory
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
            this.menuStore.signOut()
            this.$router.push({name: 'login'});
        }
    }
}
</script>

<template>
    <v-container>

    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-title>
                <span class="text-h5">Order Management</span>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <AdminOrderHistory />
            </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel>
            <v-expansion-panel-title>
                    <span class="text-h5">Menu Management</span>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <Admin />
            </v-expansion-panel-text>
        </v-expansion-panel>

    </v-expansion-panels>

</v-container>

</template>