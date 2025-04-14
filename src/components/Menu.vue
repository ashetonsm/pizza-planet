<script lang="ts">

export default {
    data(vm) {
        return {
            basket: [],
            getMenuItems: {
                1: {
                    'name': 'Margherita',
                    'description': 'A delicious tomato based pizza topped with mozzarella',
                    'options': [{
                        'size': 9,
                        'price': 6.95
                    }, {
                        'size': 12,
                        'price': 10.95
                    }]
                },
                2: {
                    'name': 'Pepperoni',
                    'description': 'A delicious tomato based pizza topped with mozzarella and pepperoni',
                    'options': [{
                        'size': 9,
                        'price': 7.95
                    }, {
                        'size': 12,
                        'price': 12.95
                    }]
                },
                3: {
                    'name': 'Ham and Pineapple',
                    'description': 'A delicious tomato based pizza topped with mozzarella, ham and pineapple',
                    'options': [{
                        'size': 9,
                        'price': 7.95
                    }, {
                        'size': 12,
                        'price': 12.95
                    }]
                }

            }
        }
    },
    methods: {
        async addToBasket(item: { name: string; description: string; options: { size: number; price: number; }[]; } | { name: string; description: string; options: { size: number; price: number; }[]; } | { name: string; description: string; options: { size: number; price: number; }[]; }, options: { size: number; price: number; } | { size: number; price: number; } | { size: number; price: number; }) {
            const pizzaExists = await this.basket.find(
                pizza => pizza.name === item.name && pizza.size === options.size
            )

            if (pizzaExists) {
                pizzaExists.quantity++;
                return
            }

            this.basket.push({
                name: item.name,
                price: options.price,
                size: options.size,
                quantity: 1
            })
        }
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
                        <td><button type="button" class="btn_green" @click="addToBasket(item, option)">+</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h1>Basket:</h1>
        {{ basket }}
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

@media screen and (min-width: 900px) {
    .menu_wrapper {
        flex-direction: row;
        justify-content: space-between;
    }

    .menu {
        width: 65vw;
    }
}

table {
    color: black;
}
</style>