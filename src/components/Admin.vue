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
        removeItem(item: Item) {
            useMenuStore().removeItem(item)
        },
        removeOrder(order: Order) {
            useMenuStore().removeOrder(order)
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
            <h3>Current Orders: ({{ menuStore.getNumberOfOrders }})</h3>
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
    </div>
</template>
