<script lang="ts">
import { useMenuStore } from '@/stores/store';
import type { Item } from '@/stores/Item';

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

    <v-sheet class="mx-auto px-6" title="Admin Order Management">
        <v-table>
            <tbody v-for="(orderArray, index) in menuStore.orders" :key="index">
                <tr class="text-h5 text-center">
                    <th class="text-center">Remove Order</th>
                    <th class="text-center">Email</th>
                    <th class="text-center">Order Status</th>
                    <th class="text-center">Details</th>
                    <th class="text-center">Basket</th>
                </tr>

                <tr v-for="(usersOrders, index) in orderArray.orders as any" :key="usersOrders.date + index">
                    <th class="text-center"><v-btn density="compact" icon="mdi-delete"
                            @click="removeOrder(usersOrders)"></v-btn></th>
                    <th class="text-center">{{ usersOrders.userEmail }}</th>

                    <td class="text-center">{{ usersOrders.orderStatus }}</td>
                    <td class="text-center"><v-btn density="compact" icon="mdi-eye"
                            @click="viewOrder(index, usersOrders)"></v-btn>
                    </td>
                    <v-card class="mx-auto my-6">
                        <v-card-item class="align-items-center justify-center">
                            <v-table v-for="(item, index) in usersOrders.basket.items"
                                :key="item.name + item.size + item.quantity + index">
            <tbody>
                <tr>
                    <td>{{ item.name }}</td>
                    <td>{{ item.size }}"</td>
                    <td>${{ item.price }}</td>
                    <td>Qty: {{ item.quantity }}</td>
                </tr>
            </tbody>
        </v-table>
        </v-card-item>
        </v-card>
        </tr>
        </tbody>
        </v-table>
    </v-sheet>
</template>
