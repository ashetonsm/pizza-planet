<script lang="ts">
export default {
    name: "Delivery",
    props: {
        deliveryAddress: {
                name: String,
                street: String,
                city: String,
                state: String,
                zip: String,
            },
    },
    data() {
        return {
            deliverySameAsBillingAddress: false
        }
    }
}
</script>

<template>
    <v-form>
        <v-text-field v-model=deliveryAddress.name label="Delivery Name" type="text"></v-text-field>
        <v-text-field v-model=deliveryAddress.street label="Delivery Address" type="text"></v-text-field>
        <v-text-field v-model=deliveryAddress.city label="Delivery City" type="text"></v-text-field>
        <v-text-field v-model=deliveryAddress.state label="Delivery State" type="text"></v-text-field>
        <v-text-field v-model=deliveryAddress.zip label="Delivery Zip" type="text"></v-text-field>
    </v-form>
</template>