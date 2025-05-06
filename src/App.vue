<script lang="ts">
import Header from './components/Header.vue';
import { useMenuStore } from './stores/store';

export default {
  name: 'app',
  setup() {
    console.log('HELLO FROM APP.VUE')
    useMenuStore().setMenuRef()
    useMenuStore().setAdminsRef()
  },
  components: {
    Header
  }
}
</script>

<template>
  <v-app id="inspire">
    <Header></Header>
  </v-app>
</template>
