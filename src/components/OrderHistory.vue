<script lang="ts">
import { useMenuStore } from '@/stores/store';

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
    setup() {
        const menuStore = useMenuStore()
        return { menuStore }
    },
    methods: {
        removeOrder(order: any) {
            console.log(order)
            if (confirm('Remove Order?')) {
                // useMenuStore().removeOrder(order)
            }
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
    <div class="orders_wrapper">

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

        <h3>Past Orders:</h3>
        <table>
            <!-- This is a list of each indexed order ([0], [1], etc) -->
            <tbody v-for="(orderArray, index) in menuStore.orders" :key="index">
                <tr class="order_number">
                    <th>Remove Order</th>
                    <th>Email</th>
                    <th>Basket</th>
                    <th>Order Status</th>
                    <th>Details</th>
                </tr>
                <tr v-for="(usersOrders, index) in orderArray as any" :key="usersOrders.date + index">
                    <th><button class="btn_red remove-order-button" @click="removeOrder(usersOrders)">Remove
                            Order</button></th>
                    <th>{{ usersOrders.userEmail }}</th>
                <tr v-for="(item, index) in usersOrders.basket.items as any"
                    :key="item.name + item.size + item.quantity + index">
                    <td>{{ item.name }}</td>
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
    <Login v-if="menuStore.currentUser == null" />
</template>
