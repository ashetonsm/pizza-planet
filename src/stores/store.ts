import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menuItems', {
    state: (): State => {
        return {
            menuItems:
                [{
                    name: 'Margherita',
                    description: 'A delicious tomato based pizza topped with mozzarella',
                    quantity: 1,
                    options: [{
                        size: 9,
                        price: 6.95
                    }, {
                        size: 12,
                        price: 10.95
                    }]
                },
                {
                    name: 'Pepperoni',
                    description: 'A delicious tomato based pizza topped with mozzarella and pepperoni',
                    quantity: 1,
                    options: [{
                        size: 9,
                        price: 7.95
                    }, {
                        size: 12,
                        price: 12.95
                    }]
                },
                {
                    name: 'Ham and Pineapple',
                    description: 'A delicious tomato based pizza topped with mozzarella, ham and pineapple',
                    quantity: 1,
                    options: [{
                        size: 9,
                        price: 7.95
                    }, {
                        size: 12,
                        price: 12.95
                    }]
                }

                ],
            orders: [],
        }
    },
    getters: {
        getMenuItems: state => state.menuItems,
        numberOfOrders: state => state.orders.length
    }
})
interface State {
    menuItems: Item[],
    orders: [],
}

interface Item {
    name: string;
    description: string;
    quantity: number;
    options: {
        size: number;
        price: number;
    }[]
}