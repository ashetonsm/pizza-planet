<script lang="ts">
import NewMenuItem from './NewMenuItem.vue';
import { useMenuStore } from '@/stores/store';
import type { Item } from '@/stores/Item';

export default {
    components: {
        NewMenuItem
    },
    setup() {
        const menuStore = useMenuStore()
        return { menuStore }
    },
    methods: {
        removeItem(item: Item) {
            useMenuStore().removeItem(item)
        },
        removeOrder(order: any) {
            console.log(order)
            // if (confirm('Remove Order?')) {
            useMenuStore().removeOrder(order)
            // }
        }
    }
}
</script>
<template>
    <div class="admin_wrapper">
        <NewMenuItem></NewMenuItem>
        <div class="menu_wrapper">
            <table>
                <thead>
                    <tr>
                        <th>
                            Item:
                        </th>
                        <th>
                            Remove from Menu
                        </th>
                    </tr>
                </thead>
                <tbody v-for="item in menuStore.getMenuItems as any" :key="item.name">
                    <tr>
                        <td>{{ item.name }}</td>
                        <td>
                            <button type="button" class="btn_red" @click="removeItem(item)">&times;</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="orders_wrapper">
            <h3>Current Orders:</h3>
            <table>
                <!-- Now an array of orders -->
                <tbody v-for="(orderArray, index) in menuStore.orders" :key="index">
                    <tr class="order_number">
                        <th>Remove Order</th>
                        <th>User Id: {{ index + 1 }}</th>
                        <th>Basket</th>
                    </tr>
                    <!-- Now an array of order objects -->
                    <tr v-for="(usersOrders, index) in orderArray.orders as any" :key="usersOrders.date + index">
                        <th><button class="btn_red remove-order-button" @click="removeOrder(usersOrders)">Remove
                                Order</button></th>
                        <th>User ID</th>
                    <tr v-for="(item, index) in usersOrders.basket.items"
                        :key="item.name + item.size + item.quantity + index">
                        {{ item.name }}
                        <td>{{ item.size }}"</td>
                        <td>${{ item.price }}</td>
                        <td>Qty: {{ item.quantity }}</td>
                    </tr>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
