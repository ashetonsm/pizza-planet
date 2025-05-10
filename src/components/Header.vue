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
                { title: 'Contact', name: 'contact' },
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
        <img class="header-logo mx-4" src="../assets/images/PPLogo.png" />
        <v-app-bar-title>Pizza Planet</v-app-bar-title>
        <v-btn :prepend-icon="menuStore.getTheme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
            :text="menuStore.getTheme" slim @click="onClick()" class="mx-4"></v-btn>
        <v-divider vertical></v-divider>
        <v-tabs class="full-menu-links" fixed-tabs>
            <v-tab v-for="tabItem, index in items" :key=tabItem.title :text=tabItem.title :value=tabItem.title
                :to=tabItem.name></v-tab>
        </v-tabs>
        <v-divider vertical></v-divider>

        <v-menu class="hamburger-menu-links">
            <template v-slot:activator="{ props }">
                <v-btn icon="mdi-menu" variant="text" v-bind="props"></v-btn>
            </template>

            <v-list>
                <v-list-item v-for="(item, i) in items" :key="i" :value="i" @click="$router.push({ name: item.name })">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
    <v-container>
        <RouterView />
    </v-container>
</template>

<style lang="css" scoped>
.header-logo {
    max-height: 3em;
}
</style>