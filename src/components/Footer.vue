<script lang="ts">

export default {
    data() {
        return {
            icons: [
                { title: 'mdi-github', url: 'https://github.com/ashetonsm' },
                { title: 'mdi-linkedin', url: 'https://www.linkedin.com/in/asheton-m-8742a222a' }
            ],
        }
    }
};
</script>

<template>
    <v-footer class="text-center d-flex flex-column ga-2 py-4" color="surface">
        <div class="d-flex ga-3">
            <v-btn v-for="icon in icons" :key="icon.title" :icon="icon.title" density="comfortable" variant="text"
                target="_blank" :href="icon.url"></v-btn>
        </div>
        <v-divider></v-divider>
        <div>
            {{ new Date().getFullYear() }} — <strong>Asheton Mayfield</strong>
        </div>
    </v-footer>
</template>