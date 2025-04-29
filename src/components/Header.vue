<script lang="ts">
export default {
    name: "appHeader"
};
</script>

<template>
    <header>
        <div class="header-background">
            <img src="../assets/images/PPLogo.png" alt="Pizza Planet Logo">
            <h1 class="site-title">Pizza Planet</h1>
            <nav>
                <ul>
                    <li>
                        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'menu' }">Menu</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'contact' }">Contact</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'about' }">About</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'account' }">Account</RouterLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
    <RouterView />
</template>
