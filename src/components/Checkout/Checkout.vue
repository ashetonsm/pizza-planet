<script lang="ts">
import { useMenuStore } from '@/stores/store.ts'
import Delivery from './Delivery.vue'
import Payment from './Payment.vue'
import Billing from './Billing.vue'


export default {
    name: "Checkout",
    setup() {
        const menuStore = useMenuStore()
        return { menuStore }
    },
    components: {
        Billing,
        Delivery,
        Payment
    },
    data() {
        return {
            deliveryAddress: {
                name: '',
                street: '',
                city: '',
                state: '',
                zip: '',
            },
            billingAddress: {
                name: '',
                street: '',
                city: '',
                state: '',
                zip: '',
            },
            paymentInformation: {
                name: '',
                cardNumber: '',
                cvv: '',
                expMonth: '',
                expYear: '',
            },
            deliverySameAsBillingAddress: false
        }
    },
    methods: {
        checkout() {
            this.menuStore.addOrder(
                this.menuStore.currentBasket[0],
                this.paymentInformation,
                this.deliveryAddress,
                this.billingAddress
            )
            alert('Your order has been placed!')
            this.menuStore.clearCurrentBasket()
            this.$router.push({ name: 'account' })
        }
    }
}
</script>
<template>
    <v-stepper :items="['Delivery Info', 'Billing Info', 'Payment Info', 'Submit']">
        <template v-slot:item.1>
            <v-card title="Delivery Info" flat>
                <Delivery :deliveryAddress=deliveryAddress />
            </v-card>
        </template>

        <template v-slot:item.2>
            <v-card title="Billing Info" flat>
                <Billing :billingAddress=billingAddress />
            </v-card>
        </template>

        <template v-slot:item.3>
            <v-card title="Payment Info" flat>
                <Payment :paymentInformation=paymentInformation />
            </v-card>
        </template>
        <template v-slot:item.4>
            <v-card title=""  flat>
                <v-btn class="d-flex mx-auto" color="secondary" @click="checkout()">Confirm Order</v-btn>
            </v-card>
        </template>
    </v-stepper>
</template>

<style lang="css" scoped>
.v-parallax--active>.v-img__img {
    transform: translate3d(0px, 0px, 0px);
}

.v-ripple__animation {
    transform: translate3d(0px, 0px, 0px);
}

.v-color-picker-canvas:hover .v-color-picker-canvas__dot {
    transform: translate3d(0px, 0px, 0px);
}
</style>