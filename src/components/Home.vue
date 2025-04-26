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
    <div class="welcome_message">
        <h2>Welcome to Pizza Planet!</h2>
        <h3>Feeling Hungry?</h3>
        <button class="order_btn" @click="goToMenu">Let's Order!</button>
    </div>
</template>