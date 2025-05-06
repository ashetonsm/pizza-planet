<script lang="ts">
import NewMenuItem from './NewMenuItem.vue';
import { useMenuStore } from '@/stores/store';
import type { Item } from '@/stores/Item';
import RemoveMenuItem from './RemoveMenuItem.vue';

export default {
    data() {
        return {
            displayDetails: false,
            selectedOrder: {
                id: -1,
                status: -1,
                items: []
            }
        }
    },
    components: {
        NewMenuItem,
        RemoveMenuItem
    },
    setup() {
        const menuStore = useMenuStore()
        return { menuStore }
    },
    methods: {
        removeItem(item: Item) {
            useMenuStore().removeItem(item)
        },
        handleClose() {
            if (this.displayDetails === false) {
                this.displayDetails = true;
            } else {

                this.displayDetails = false
                this.selectedOrder = {
                    id: -1,
                    status: -1,
                    items: []
                }
            }
        },
        removeOrder(order: any) {
            console.log(order)
            // if (confirm('Remove Order?')) {
            useMenuStore().removeOrder(order)
            // }
        },
        viewOrder(orderIndex: any, orderData: any) {
            console.log(orderIndex)
            this.selectedOrder = {
                id: orderIndex,
                status: orderData.orderStatus,
                items: orderData.basket.items
            }
            this.handleClose()
        },
    }
}
</script>
<template>
    <div class="admin_wrapper">
        <NewMenuItem></NewMenuItem>
        <RemoveMenuItem></RemoveMenuItem>

        <section v-if="displayDetails === true">
            <button class="btn_red" @click="handleClose()">CLOSE</button>
            <h3>Order #{{ selectedOrder.id }}:</h3>
            <h2>Status: {{ selectedOrder.status }}</h2>
            <ul v-for="i in selectedOrder.items as any">
                <li>{{ i.name }}</li>
                <li>{{ i.size }}</li>
                <li>${{ i.price }}</li>
                <li>Qty: {{ i.quantity }}</li>
            </ul>
        </section>

        <div class="orders_wrapper">
            <h3>Current Orders:</h3>
            <table>
                <!-- Now an array of orders -->
                <tbody v-for="(orderArray, index) in menuStore.orders" :key="index">
                    <tr class="order_number">
                        <th>Remove Order</th>
                        <th>Email</th>
                        <th>Basket</th>
                        <th>Order Status</th>
                        <th>Details</th>
                    </tr>
                    <!-- Now an array of order objects -->
                    <tr v-for="(usersOrders, index) in orderArray.orders as any" :key="usersOrders.date + index">
                        <th><button class="btn_red remove-order-button" @click="removeOrder(usersOrders)">Remove
                                Order</button></th>
                        <th>{{ usersOrders.userEmail }}</th>
                    <tr v-for="(item, index) in usersOrders.basket.items"
                        :key="item.name + item.size + item.quantity + index">
                        {{ item.name }}
                        <td>{{ item.size }}"</td>
                        <td>${{ item.price }}</td>
                        <td>Qty: {{ item.quantity }}</td>
                    </tr>
                    <th>{{ usersOrders.orderStatus }}</th>
                    <th><button class="btn_green" @click="viewOrder(index, usersOrders)">View</button></th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
