<script lang="ts">

export default {
    name: "Billing",
    props: {
        billingAddress: {
                name: String,
                street: String,
                city: String,
                state: String,
                zip: String,
            },    
    },
    data() {
        return {
            billingSameAsDelivery: false
        }
    }
}
</script>

<template>
    <v-checkbox v-model=billingSameAsDelivery label="Same as Delivery Address?" type="checkbox"></v-checkbox>
    <v-form v-if="billingSameAsDelivery == false">
        <v-text-field v-model=billingAddress.name label="Delivery Name" type="text"></v-text-field>
        <v-text-field v-model=billingAddress.street label="Delivery Address" type="text"></v-text-field>
        <v-text-field v-model=billingAddress.city label="Delivery City" type="text"></v-text-field>
        <v-text-field v-model=billingAddress.state label="Delivery State" type="text"></v-text-field>
        <v-text-field v-model=billingAddress.zip label="Delivery Zip" type="text"></v-text-field>
    </v-form>
</template>