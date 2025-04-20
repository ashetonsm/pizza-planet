<script lang="ts">

type Item = {
    name: string;
    description: string;
    quantity: number;
    options: {
        size: number;
        price: number;
    }[]
}
type Options = {
    size: number;
    price: number;
}

export default {
    data(vm) {
        return {
            basket: [],
            basketText: 'Your basket is empty.',
            getMenuItems: {
                1: {
                    name: 'Margherita',
                    description: 'A delicious tomato based pizza topped with mozzarella',
                    options: [{
                        size: 9,
                        price: 6.95
                    }, {
                        size: 12,
                        price: 10.95
                    }]
                },
                2: {
                    name: 'Pepperoni',
                    description: 'A delicious tomato based pizza topped with mozzarella and pepperoni',
                    options: [{
                        size: 9,
                        price: 7.95
                    }, {
                        size: 12,
                        price: 12.95
                    }]
                },
                3: {
                    name: 'Ham and Pineapple',
                    description: 'A delicious tomato based pizza topped with mozzarella, ham and pineapple',
                    options: [{
                        size: 9,
                        price: 7.95
                    }, {
                        size: 12,
                        price: 12.95
                    }]
                }

            }
        }
    },
    methods: {
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
            }
        },
    },
    name: "Menu"
}
</script>
<template>
    <div class="menu_wrapper">
        <!-- Menu -->
        <div class="menu">
            <h1>Menu</h1>

            <h3>Pizza</h3>
            <table v-for="item in getMenuItems" :key="item.name">
                <tbody>
                    <tr>
                        <td><strong>~{{ item.name }}~</strong></td>
                    </tr>
                    <tr>
                        <td>
                            <small>{{ item.description }}
                            </small>
                        </td>
                    </tr>
                    <tr v-for="(option, index) in item.options">
                        <td :key="index">{{ option.size }}"</td>
                        <td :key="index">${{ option.price }}</td>
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
                            <td>$ {{ item.price * item.quantity }}</td>
                        </tr>
                    </tbody>
                </table>
                <p>Order Total:</p>
                <button class="btn_green">Place Order</button>
            </div>
            <div v-else>
                <h3>{{ basketText }}</h3>
            </div>
        </div>
    </div>
</template>

<style scoped>
h3 {
    text-align: center;
}

.menu_wrapper {
    display: flex;
    flex-direction: column;
}

.menu {
    background-color: #f1e6ea;
    border-radius: 3px;
    height: 100vh;
    margin: 10px;
    padding: 10px;
}

.basket {
    background-color: #f1e6ea;
    border-radius: 3px;
    height: 100vh;
    margin: 10px;
    padding: 10px;
}

@media screen and (min-width: 900px) {
    .menu_wrapper {
        flex-direction: row;
        justify-content: space-between;
    }

    .menu {
        width: 45vw;
    }

    .basket {
        width: 25vw;
    }
}

table {
    color: black;
}
</style>