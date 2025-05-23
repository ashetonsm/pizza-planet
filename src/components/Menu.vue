<script lang="ts">
type Options = {
    size: number;
    price: number;
}
import type { Item } from '@/stores/Item';
import { useMenuStore } from '@/stores/store.ts'
import Login from './Login.vue';
import { firebaseAuth } from '@/firebase';

export default {
    components: {
        Login
    },
    data() {
        return {
            basket: [],
            basketText: 'Your basket is empty.'
        }
    },
    setup() {
        const auth = firebaseAuth
        const menuStore = useMenuStore()
        return { menuStore, auth }
    },
    methods: {
        addNewOrder() {
            this.menuStore.setCurrentBasket(this.basket as unknown as Item)
                .then(() => {
                    this.basket = [];
                    this.basketText = 'Thank you! Please wait to be redirected...'
                    this.$router.push({ name: 'checkout' })
                })
        },
        async addToBasket(item: Item, options: Options) {
            let thisItem: Item = item;

            const pizzaExists = await (this.basket as unknown as any[]).find(
                pizza => pizza.name === thisItem.name && pizza.size === options.size
            )

            if (pizzaExists) {
                pizzaExists.quantity++;
                return
            }


            (this.basket as unknown as any[]).push({
                name: thisItem.name,
                price: options.price,
                size: options.size,
                quantity: 1
            })
        },
        removeFromBasket(item: never) {
            this.basket.splice(this.basket.indexOf(item), 1);
        },
        increaseQuantity(item: Item) {
            item.quantity++;
        },
        decreaseQuantity(item: Item) {
            item.quantity--;
            if (item.quantity === 0) {
                this.removeFromBasket(item as never);
                this.basketText = 'Your basket is empty.';
            }
        },
    },
    computed: {
        total() {
            let totalCost = 0
            let thisBasket: Item[] = this.basket
            thisBasket.map(item => {
                totalCost += item.quantity * item.price
            })
            return totalCost
        }
    },
    name: "Menu"
}
</script>
<template>
    <v-container class="d-flex">

        <v-container class="mx-auto rounded">
            <h1>Menu</h1>
            <v-table style="width: 35vw" v-for="item in menuStore.menuItems as any" :key="item.name" class="mt-4 pa-4">
                <tbody>
                    <tr>
                        <td>
                            <p class="text-h5">{{ item.name }}</p>
                            <p class="text-subtitle-1">{{ item.description }}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p class="text-h6 text-left">Size/Qty</p>
                        </td>
                        <td>
                            <p class="text-h6 text-center">Price</p>
                        </td>
                        <td>
                            <p class="text-h6 text-right">Add</p>
                        </td>
                    </tr>

                    <tr v-for="(option, index) in item.options">
                        <td :key="index">
                            <p class="text-left">
                                {{ option.size }}"
                            </p>
                        </td>
                        <td :key="index">
                            <p class="text-center">${{ option.price }}</p>
                        </td>
                        <td class="text-right"><v-btn icon="mdi-plus" density="compact"
                                @click="addToBasket(item as never, option)"></v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-container>


        <v-container class="mx-auto">
            <h1>Basket:</h1>
            <section v-if="basket.length > 0">
                <v-table style="width: 35vw" class="mt-4 pa-4 rounded">
                    <tbody>
                        <tr>
                            <td class="text-h5 text-center">Qty</td>
                            <td class="text-h5 text-left">Item</td>
                            <td class="text-h5 text-left">Price</td>
                        </tr>
                        <tr v-for="(item, index) in basket as any" :key="index">
                            <td class="text-center">
                                <v-btn class="ml-4" icon="mdi-plus" density="compact" @click="increaseQuantity(item)"
                                    color="success"></v-btn>

                                <span class="text-subtitle-1 mx-2">{{ item.quantity }}</span>

                                <v-btn class="mr-4" icon="mdi-minus" density="compact" @click="decreaseQuantity(item)"
                                    color="error"></v-btn>
                            </td>
                            <td class="text-subtitle-1 text-left">{{ item.name }} {{ item.size }}"</td>
                            <td class="text-subtitle-1">${{ (item.price * item.quantity).toFixed(2) }}</td>
                        </tr>
                    </tbody>
                </v-table>
                <p class="text-h5">Order Total: ${{ total.toFixed(2) }}</p>

                <section v-if="auth.currentUser == null">
                    <p class="text-h6">You're not signed in!</p>
                    <v-btn @click="$router.push({name: 'login'})" color="success">Sign In</v-btn>
                </section>
                <section v-if="auth.currentUser !== null">
                    <v-btn @click="addNewOrder" color="success">Place Order</v-btn>
                </section>
            </section>
            <section v-else>
                <v-table style="width: 35vw" class="mt-4 pa-4 rounded">
                    <tbody>
                        <tr>
                            <td class="text-h5 text-center">{{ basketText }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </section>
        </v-container>
    </v-container>

</template>
