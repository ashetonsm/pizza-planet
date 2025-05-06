<script lang="ts">
type Options = {
    size: number;
    price: number;
}
import type { Item } from '@/stores/Item';
import { useMenuStore } from '@/stores/store.ts'
import Login from './Login.vue';

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
        const menuStore = useMenuStore()
        return { menuStore }
    },
    methods: {
        addNewOrder() {
            this.menuStore.setCurrentBasket(this.basket as unknown as Item)
                .then(() => {
                    this.basket = [];
                    this.basketText = 'Thank you, your order has been placed!'
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
    <v-container fluid>
        <!-- Menu -->
        <div class="menu">
            <h1>Menu</h1>

            <h3>Pizza</h3>
            <table v-for="item in menuStore.menuItems as any" :key="item.name">
                <tbody>
                    <tr>
                        <td>
                            <p class="menu-item-name">{{ item.name }}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p class="menu-item-description">{{ item.description }}</p>
                        </td>
                    </tr>
                    <tr v-for="(option, index) in item.options">
                        <td :key="index">
                            <p class="menu-item-size">
                                {{ option.size }}"
                            </p>
                        </td>
                        <td :key="index">
                            <p class="menu-item-price">${{ option.price }}</p>
                        </td>
                        <td><button type="button" class="btn_green"
                                @click="addToBasket(item as never, option)">+</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- shopping basket -->
        <div class="basket">
            <h1>Basket:</h1>
            <div v-if="basket.length > 0">
                <table>
                    <tbody v-for="(item, index) in basket as any" :key="index">
                        <tr>
                            <td>
                                <button class="btn_green" @click="decreaseQuantity(item)">&#8722;</button>
                                <span>{{ item.quantity }}</span>
                                <button class="btn_green" @click="increaseQuantity(item)">+</button>
                            </td>
                            <td>{{ item.name }} {{ item.size }}"</td>
                            <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
                        </tr>
                    </tbody>
                </table>
                <p>Order Total: ${{ total.toFixed(2) }}</p>

                <section v-if="menuStore.currentUser == null">
                    <p>You're not signed in!</p>
                    <Login></Login>
                </section>
                <section v-if="menuStore.currentUser !== null">
                    <button class="btn_green" @click="addNewOrder">Place Order</button>
                </section>
            </div>
            <div v-else>
                <h3>{{ basketText }}</h3>
            </div>
        </div>
    </v-container>
</template>
