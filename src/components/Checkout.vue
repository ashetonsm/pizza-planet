<script lang="ts">
import { useMenuStore } from '@/stores/store.ts'


export default {
    name: "Checkout",
    setup() {
        const menuStore = useMenuStore()
        return { menuStore }
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
    <div class="checkout-wrapper">
        <p>Billing Information:</p>
        <form class="form">
            <div class="fields">
                <div class="field">
                    <label for="city">Billing Name</label>
                    <div>
                        <input type="text" name="name" id="billing-name" v-model="billingAddress.name" />
                    </div>
                </div>
                <div class="field">
                    <label for="city">Billing Address</label>
                    <div>
                        <input type="text" name="address" id="billing-address" v-model="billingAddress.street" />
                    </div>
                </div>
                <div class="field">
                    <label for="city">City</label>
                    <div>
                        <input type="text" name="city" id="biling-city" v-model="billingAddress.city" />
                    </div>
                </div>
                <div class="field">
                    <label for="state">State</label>
                    <div>
                        <input type="text" name="state" id="billing-state" v-model="billingAddress.state" />
                    </div>
                </div>
                <div class="field">
                    <label for="zip">Zip</label>
                    <div>
                        <input type="text" id="zip" name="billing-zip" v-model="billingAddress.zip" />
                    </div>
                </div>
                <h2>Delivery Address:</h2>
                <div class="field">
                    <label for="sameAddress">Same as Billing Address?</label>
                    <div>
                        <input type="checkbox" id="delivery-address-checkbox" name="delivery-address-checkbox"
                            v-model="deliverySameAsBillingAddress" />
                    </div>
                </div>
            </div>

            <div class="fields" v-if="deliverySameAsBillingAddress == false">
                <div class="field">
                    <label for="city">Delivery Name</label>
                    <div>
                        <input type="text" name="name" id="delivery-name" v-model="deliveryAddress.name" />
                    </div>
                </div>
                <div class="field">
                    <label for="city">Delivery Address</label>
                    <div>
                        <input type="text" name="address" id="delivery-address" v-model="deliveryAddress.street" />
                    </div>
                </div>
                <div class="field">
                    <label for="city">City</label>
                    <div>
                        <input type="text" name="city" id="delivery-city" v-model="deliveryAddress.city" />
                    </div>
                </div>
                <div class="field">
                    <label for="state">State</label>
                    <div>
                        <input type="text" name="state" id="delivery-state" v-model="deliveryAddress.state" />
                    </div>
                </div>
                <div class="field">
                    <label for="zip">Zip</label>
                    <div>
                        <input type="text" id="zip" name="delivery-zip" v-model="deliveryAddress.zip" />
                    </div>
                </div>
            </div>

            <p>Payment Information:</p>
            <div class="field">
                <label for="city">Cardholder Name</label>
                <div>
                    <input type="text" name="name" id="card-name" v-model="paymentInformation.name" />
                </div>
            </div>
            <div>
                <label for="cardNumber">Credit Card:</label>
                <input type="text" id="cardNumber" placeholder="5432 1234 55555"
                    v-model="paymentInformation.cardNumber">
            </div>
            <div>
                <label for="cvc">CVC:</label>
                <input type="cvc" id="cvc" v-model="paymentInformation.cvv">
            </div>
            <div>
                <label for="expiration">Expiration Date:</label>
                <select v-model="paymentInformation.expMonth">
                    <option value="01">January</option>
                    <option value="02">February </option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                <input type="year" id="expiration-year" v-model="paymentInformation.expYear" :maxlength="5">

            </div>
            <input id="submit" class="submit btn_green" type="submit" @click.prevent="checkout()" value="Submit" />
        </form>
        {{ billingAddress }}
        {{ deliveryAddress }}
        {{ paymentInformation }}
        {{ deliverySameAsBillingAddress }}
    </div>
</template>