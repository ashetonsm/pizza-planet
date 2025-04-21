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
    <div class="background">
        <div class="background-overlay">
            <h2>Welcome to Pizza Planet!</h2>
            <img src="../assets/images/roller.png" alt="Roller image">
            <h3>Feeling Hungry?</h3>
            <button class="order_btn" @click="goToMenu">Let's Order!</button>
        </div>
    </div>
</template>