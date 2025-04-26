<script lang="ts">
export default {
    name: "About"
}
</script>
<template>
    <div>
        <h3>Info Links:</h3>
        <nav>
            <ul>
                <RouterLink :to="{ name: 'history' }">History</RouterLink>
                <RouterLink :to="{ name: 'delivery' }">Delivery</RouterLink>
                <RouterLink :to="{ name: 'orderGuide' }">Order Guide</RouterLink>
            </ul>
        </nav>
        <RouterView></RouterView>
    </div>
</template>
