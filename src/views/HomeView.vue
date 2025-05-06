<script setup lang="ts">
import OrderGuide from '@/components/OrderGuide.vue';
import Home from '../components/Home.vue'
import Delivery from '@/components/Delivery.vue';
import History from '@/components/History.vue';
</script>

<template>
  <v-app id="inspire">
    <v-app-bar extended>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title>Application</v-app-bar-title>

      <v-btn icon="mdi-dots-vertical">
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col v-for="n in 24" :key="n" cols="4">
            <v-card height="200"></v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
