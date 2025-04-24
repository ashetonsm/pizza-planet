<script setup lang="ts">
import Header from './components/Header.vue';
import { useMenuStore } from './stores/store';
</script>

<script lang="ts">
export default {
  name: 'app',
  components: {
    appHeader: Header
  },
  created() {
    console.log('HELLO')
    useMenuStore().setMenuRef()
    useMenuStore().setOrdersRef()
  }
}
</script>

<template>
  <Header></Header>
</template>
