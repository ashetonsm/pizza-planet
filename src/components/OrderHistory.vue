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
    <div class="orders_wrapper">
        <h3>Past Orders:</h3>
        <table>
            <!-- This is a list of each indexed order ([0], [1], etc) -->
            <tbody v-for="(orderArray, index) in menuStore.orders" :key="index">
                <tr class="order_number">
                    <th>User Id: {{ index + 1 }}</th>
                    <th>Basket</th>
                    <th>Items</th>
                </tr>
                <tr v-for="(usersOrders, index) in orderArray as any" :key="usersOrders.date + index">
                    <th><button class="btn_red remove-order-button" @click="removeOrder(usersOrders)">Remove
                            Order</button></th>
                    <th>User ID</th>
                <tr v-for="(item, index) in usersOrders.basket.items as any"
                    :key="item.name + item.size + item.quantity + index">
                    <td>{{ item.name }}</td>
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
