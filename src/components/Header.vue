<script setup lang="ts">
export interface Header {
    name: "appHeader"
};
import { RouterLink, RouterView } from 'vue-router'
</script>
<style scoped>
h1 {
    font-size: 1.3em;
}

.header_logo {
    background-image: linear-gradient(45deg,
            #d85226 25%,
            #f79e38 25% 50%,
            #d85226 50% 75%,
            #f79e38 75%,
            #f79e38 100%,

        );
    background-size: 80px 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
}
</style>
<template>
    <header>
        <div class="header_logo">
            <img src="../assets/images/planet.png" alt="Pizza Planet Icon">
            <h1 href="/">Pizza Planet</h1>
        </div>

        <div class="wrapper">
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/menu">Menu</RouterLink>
                <RouterLink to="/contact">Contact</RouterLink>
                <RouterLink to="/about">About</RouterLink>
            </nav>
        </div>
    </header>
    <RouterView />
</template>