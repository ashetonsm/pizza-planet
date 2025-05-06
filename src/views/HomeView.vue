<script setup lang="ts">
import OrderGuide from '@/components/OrderGuide.vue';
import Home from '../components/Home.vue'
import Delivery from '@/components/Delivery.vue';
import History from '@/components/History.vue';
</script>

<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col v-for="n in 3" :key="n" cols="4">
          <v-card height="200"></v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
