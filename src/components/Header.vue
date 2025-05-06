<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';

export default {
    components: {
        RouterLink,
        RouterView
    }
};
</script>

<template>
    <v-app-bar>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-app-bar-title>Pizza Planet</v-app-bar-title>
        <nav>
            <RouterLink :to="{ name: 'home' }">Home</RouterLink>
            <RouterLink :to="{ name: 'menu' }">Menu</RouterLink>
            <RouterLink :to="{ name: 'contact' }">Contact</RouterLink>
            <RouterLink :to="{ name: 'about' }">About</RouterLink>
            <RouterLink :to="{ name: 'account' }">Account</RouterLink>
        </nav>

        <v-btn icon="mdi-dots-vertical">
        </v-btn>
    </v-app-bar>
    <RouterView />
</template>
