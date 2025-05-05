<script lang="ts">
import { useMenuStore } from '@/stores/store';
import { Order } from '@/stores/Item';
import { collection, doc } from 'firebase/firestore';
import { useDocument } from 'vuefire';
import { db } from '@/firebase';

export default {
    setup() {
        const menuStore = useMenuStore()
        return { menuStore }
    },
    methods: {
        removeOrder(order: Order) {
            console.log(order)
            // if (confirm('Remove Order?')) {
            useMenuStore().removeOrder(order)
            // }
        }
    }
}
</script>
<template>
    <div class="orders_wrapper">
        <h3>Past Orders:</h3>
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
    <Login v-if="menuStore.currentUser == null" />
</template>
