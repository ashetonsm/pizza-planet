<script lang="ts">
import { getAuth } from 'firebase/auth';
import Header from './components/Header.vue';
import { useMenuStore } from './stores/store';

export default {
  name: 'app',
  setup() {
    const menuStore = useMenuStore()
    const auth = getAuth()
    if (auth.currentUser) {
      menuStore.setAdminStatus()
        .then(() => {
          menuStore.setOrdersRef(auth.currentUser!.uid)
        })
    }
    console.log('HELLO FROM APP.VUE')
    useMenuStore().setMenuRef()
    useMenuStore().setAdminsRef()
    useMenuStore().setThemeRef()
    return { menuStore, auth }

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
