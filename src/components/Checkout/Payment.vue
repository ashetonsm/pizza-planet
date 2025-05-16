<script lang="ts">
import { shallowRef } from 'vue';


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
    data() {
        return {
            months: [
                    {text: 'January', value: 1},
                    {text: 'February', value: 2},
                    {text: 'March', value: 3},
                    {text: 'April', value: 4},
                    {text: 'May', value: 5},
                    {text: 'June', value: 6},
                    {text: 'July', value: 7},
                    {text: 'August', value: 8},
                    {text: 'September', value: 9},
                    {text: 'October', value: 10},
                    {text: 'November', value: 11},
                    {text: 'December', value: 12}
                ],
                selected: shallowRef({text: 'January', value: 1})

        }
    }
}
</script>

<template>

    <v-form>
        <v-text-field v-model=paymentInformation.name label="Cardholder Name" type="text"></v-text-field>
        <v-text-field v-model=paymentInformation.cardNumber label="Credit Card" type="text"></v-text-field>
        <v-text-field v-model=paymentInformation.cvv label="CVC" type="number"></v-text-field>
        <v-select v-model=paymentInformation.expMonth label="Expiration Month" 
        :items="months" item-title="text" item-value="value">
            <option v-for="month in months" :value="month.value">
                {{ months.text }}
            </option>
        </v-select>
    </v-form>
    <v-text-field v-model=paymentInformation.expYear label="Exp (MM/YYYY)" type="year"></v-text-field>
</template>