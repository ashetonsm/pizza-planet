<script setup lang="ts">
import Header from './components/Header.vue';
import { useCounterStore } from './stores/counter';
const store = useCounterStore();
</script>

<template>
  <div>
    <p>Count: {{ store.count }}</p>
    <p>Double Count: {{ store.doubleCount }}</p>
    <button @click="store.increment()">Increase Count</button>
  </div>
  <Header></Header>
</template>

<style scoped></style>
