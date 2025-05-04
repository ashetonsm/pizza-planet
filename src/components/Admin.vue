<script lang="ts">
import NewMenuItem from './NewMenuItem.vue';
import { useMenuStore } from '@/stores/store';
import type { Item, Order } from '@/stores/Item';

export default {
    components: {
        NewMenuItem
    },
    setup() {
        const menuStore = useMenuStore()
        return { menuStore }
    },
    methods: {
        fetchOrders() {
            useMenuStore().setOrdersRef()
        },
        removeItem(item: Item) {
            useMenuStore().removeItem(item)
        },
        removeOrder(order: Order) {
            if (confirm('Remove Order?')) {
                useMenuStore().removeOrder(order)
            }
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
            <button @click="fetchOrders()">Fetch Orders</button>
            <h3>Current Orders:</h3>
            <table>
                <!-- Now an array of orders -->
                <tbody v-for="(orderArray, index) in menuStore.orders" :key="index">
                    <tr class="order_number">
                        <th colspan="4">
                            <strong>Order Id: {{ index + 1 }}</strong>
                            <!-- <button type="button" class="btn_red" @click="removeOrder(orderArray)">&times;</button> -->
                        </th>
                    </tr>
                    <!-- Now an array of order objects -->
                    <tr v-for="usersOrders in orderArray.orders as any" :key="usersOrders.id + index">
                        <td v-for="item in usersOrders.basket.items">{{ item.name }}</td>
                        <td v-for="item in usersOrders.basket.items">{{ item.size }}"</td>
                        <td v-for="item in usersOrders.basket.items">${{ item.price }}</td>
                        <td v-for="item in usersOrders.basket.items">Qty: {{ item.quantity }}</td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
