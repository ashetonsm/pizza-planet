<script lang="ts">
import Header from './components/Header.vue';
import { useMenuStore } from './stores/store';

export default {
  name: 'app',
  setup() {
    const menuStore = useMenuStore()
    menuStore.setMenuRef()
    menuStore.setThemeRef()
    menuStore.setAdminsRef()
    return { menuStore }
  },
  components: {
    Header
  },
}
</script>

<template>
  <v-app id="inspire" :theme="menuStore.getTheme">
    <Header></Header>
  </v-app>
</template>
