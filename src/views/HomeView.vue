<script setup lang="ts">
import OrderGuide from '@/components/OrderGuide.vue';
import Home from '../components/Home.vue'
import Delivery from '@/components/Delivery.vue';
import History from '@/components/History.vue';
</script>

<template>
  <v-main>
    <v-container>
      <Home />
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="4">
          <Delivery />
        </v-col>
        <v-col cols="4">
          <History />
        </v-col>
        <v-col cols="4">
          <OrderGuide />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
