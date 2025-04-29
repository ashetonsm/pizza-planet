<script lang="ts">
import NewMenuItem from './NewMenuItem.vue';
import Login from './Login.vue';
import Admin from './Admin.vue';
import { useMenuStore } from '@/stores/store';
import type { Item, Order } from '@/stores/Item';

export default {
    setup() {
        const menuStore = useMenuStore()
        return { menuStore }
    },
    methods: {
        signOut() {
            useMenuStore().signOut()
        },
    }
}
</script>
<template>
    <div class="current_user_wrapper">
        <section v-if="menuStore.currentUser !== null">
            <p>Logged in as: {{ menuStore.currentUser?.email }}</p>
            <button type="button" class="btn_red" @click="signOut()">Sign Out</button>
        </section>
        <Admin></Admin>
    </div>

    <Login v-if="menuStore.currentUser == null" />
</template>
