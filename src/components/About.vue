<script lang="ts">
export default {
    name: "About"
}
</script>
<template>
    <div>
        <h3>Info Links:</h3>
        <nav>
            <ul class="about-ul">
                <li>
                    <RouterLink :to="{ name: 'history' }">History</RouterLink>
                </li>
                <li>
                    <RouterLink :to="{ name: 'delivery' }">Delivery</RouterLink>
                </li>
                <li>
                    <RouterLink :to="{ name: 'orderGuide' }">Order Guide</RouterLink>
                </li>
            </ul>
        </nav>
        <RouterView></RouterView>
    </div>
</template>
