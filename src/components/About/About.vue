<script lang="ts">
export default {
    name: "About",
    data() {
        return {
            displayHistory: false,
            displayDelivery: false,
            displayOrderGuide: false,
        }
    },
    methods: {
        toggleView(btnValue: any) {
            console.log(btnValue)
        }
    }
}
</script>
<template>
    <v-container class="d-flex">
        <v-card class="mx-auto" title="Learn More About us!"
            text="Click one of the links below to discover more about Pizza Planet."></v-card>
    </v-container>
    <v-container class="d-flex">
        <v-btn-toggle rounded="xl" class="mx-auto" color="secondary">
            <v-btn value="history" :to="{ name: 'history' }" :active="displayHistory === true ? true : false">Company
                History</v-btn>
            <v-btn value="orderGuide" :to="{ name: 'orderGuide' }"
                :active="displayOrderGuide === true ? true : false">How to Order</v-btn>
            <v-btn value="delivery" :to="{ name: 'delivery' }"
                :active="displayDelivery === true ? true : false">Delivery Information</v-btn>
        </v-btn-toggle>
    </v-container>
    <RouterView></RouterView>
</template>
