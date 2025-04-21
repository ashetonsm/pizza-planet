<script lang="ts">
export default {
    name: "appHeader"
};
</script>

<template>
    <header>
        <div class="header_logo">
            <img src="../assets/images/planet.png" alt="Pizza Planet Icon">
            <h1 href="/">Pizza Planet</h1>
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

.header_logo img {
    max-width: 15vw;
}

@media screen and (min-width: 900px) {
    .header_logo img {
        max-width: 10vw;
    }
}
</style>
