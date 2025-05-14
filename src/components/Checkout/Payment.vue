<script lang="ts">

export default {
    name: "Payment",
    props: {
        paymentInformation: {
                name: String,
                cardNumber: String,
                cvv: String,
                expMonth: String,
                expYear: String,
            },
    },
}
</script>

<template>

    <v-form>
        <v-text-field v-model=paymentInformation.name label="Cardholder Name" type="text"></v-text-field>
        <v-text-field v-model=paymentInformation.cardNumber label="Credit Card" type="text"></v-text-field>
        <v-text-field v-model=paymentInformation.cvv label="CVC" type="number"></v-text-field>
        <v-select v-model=paymentInformation.expMonth label="Expiration Month" :items="[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]" item-value="1,2,3,4,5,6,7,8,9,10,11,12"></v-select>
    </v-form>
    <v-text-field v-model=paymentInformation.expYear label="Exp (MM/YYYY)" type="year"></v-text-field>
</template>