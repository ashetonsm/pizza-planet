<script lang="ts">
import { useMenuStore } from '@/stores/store';
import { Order, Item } from '@/stores/Item';

export default {
    setup() {
        const menuStore = useMenuStore()
        return { menuStore }
    },
    methods: {
        removeOrder(order: Order) {
            if (confirm('Remove Order?')) {
                useMenuStore().removeOrder(order)
            }
        }
    }
}
</script>
<template>
    <div class="orders_wrapper">
        <h3>Past Orders: ({{ menuStore.getNumberOfOrders }})</h3>
        <table>
            <tbody v-for="(order, index) in menuStore.orders" :key="index">
                <tr class="order_number">
                    <th colspan="4">
                        <strong>Order Id: {{ index + 1 }}</strong>
                        <button type="button" class="btn_red" @click="removeOrder(order)">&times;</button>
                    </th>
                </tr>
                <tr v-for="orderItem in order.basket.items as Item[]" :key="orderItem.name + index">
                    <td>{{ orderItem.name }}</td>
                    <td>${{ orderItem.price }}</td>
                    <td>{{ orderItem.size }}"</td>
                    <td>Qty: {{ orderItem.quantity }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <Login v-if="menuStore.currentUser == null" />
</template>
