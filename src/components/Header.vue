<script lang="ts">
export default {
    name: "appHeader"
};
</script>

<template>
    <header>
        <div class="header_logo">
            <h1>Pizza Planet</h1>
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
                        <RouterLink :to="{ name: 'admin' }">ADMIN</RouterLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
    <RouterView />
</template>
