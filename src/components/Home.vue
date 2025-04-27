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
    <div class="flex-container">
        <div class="welcome-message">
            <h2>Welcome to Pizza Planet!</h2>
            <p>Feeling Hungry?</p>
            <button class="order-btn" @click="goToMenu">Let's Order!</button>
        </div>
    </div>
</template>