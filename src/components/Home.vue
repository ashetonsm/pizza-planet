<script lang="ts">
export default {
    name: "Home",
    methods: {
        goToMenu() {
            this.$router.push({ name: 'menu' });
        }
    }
}
</script>
<template>
    <v-card title="Welcome to Pizza Planet" subtitle="So good it's out of this world!" text="Feeling Hungry?">
        <v-card-actions>
            <v-btn @click="goToMenu">Let's Order!</v-btn>
        </v-card-actions>
    </v-card>
</template>