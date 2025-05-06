<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue'
import { useMenuStore } from '@/stores/store';

export default {
    setup() {
        const menuStore = useMenuStore()
        return { menuStore }
    },
    components: {
        RouterLink,
        RouterView
    },
    data() {
        return {
            theme: ref('light'),
            items: [
                { title: 'Home', name: 'home' },
                { title: 'Menu', name: 'menu' },
                { title: 'About', name: 'about' },
                { title: 'Account', name: 'account' },
            ]
        }
    },
    methods: {
        onClick() {
            useMenuStore().setTheme()
        }
    }
};
</script>

<template>
    <v-app-bar>
        <img class="header-logo" src="../assets/images/PPLogo.png" />
        <v-app-bar-title>Pizza Planet</v-app-bar-title>
        <v-btn :prepend-icon="menuStore.getTheme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
            text="Toggle Theme" slim @click="onClick()"></v-btn>
        <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
            </template>

            <v-list>
                <v-list-item v-for="(item, i) in items" :key="i" :value="i" @click="$router.push({ name: item.name })">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
    <RouterView />
</template>

<style lang="css" scoped>
.header-logo {
    max-height: 3em;
}
</style>