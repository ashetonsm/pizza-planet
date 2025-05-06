<script lang="ts">
import Header from './components/Header.vue';
import { useMenuStore } from './stores/store';
import { ref } from 'vue'

export default {
  name: 'app',
  setup() {
    const theme = ref('light')
    console.log('HELLO FROM APP.VUE')
    useMenuStore().setMenuRef()
    useMenuStore().setAdminsRef()
  },
  components: {
    Header
  },
  data() {
    return {
      theme: ref('light'),
    }
  },
}
</script>

<template>
  <v-app id="inspire" :theme="theme">
    <v-container fluid>
      <Header></Header>
    </v-container>
  </v-app>
</template>
