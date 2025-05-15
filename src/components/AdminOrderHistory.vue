<script lang="ts">
import OrderModal from '@/components/OrderModal.vue'
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
    components: {
        OrderModal
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
            if (confirm('Remove Order?')) {
                useMenuStore().removeOrder(order)
            }
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
        <v-table>
            <tr class="text-h5 text-center">
                <th class="text-center">Remove Order</th>
                <th class="text-center">Email</th>
                <th class="text-center">Order Status</th>
                <th class="text-center">Details</th>
            </tr>
            <tbody v-for="(orderArray, index) in menuStore.orders" :key="index">

                <tr v-for="(usersOrders, index) in orderArray.orders as any" :key="usersOrders.date + index">
                    <th class="text-center"><v-btn density="compact" icon="mdi-delete"
                            @click="removeOrder(usersOrders)"></v-btn></th>
                    <th class="text-center">{{ usersOrders.userEmail }}</th>

                    <td class="text-center">{{
                        usersOrders.orderStatus == 0 ? "In Progress" :
                            usersOrders.orderStatus == 1 ? "Ready for Pickup" :
                                usersOrders.orderStatus == 2 ? "Out for Delivery" :
                                    usersOrders.orderStatus == 3 ? "Completed" :
                                        "Oops! Something went wrong. If this message persists, please contact the store."
                    }}</td>
                    <td class="text-center">
                        <OrderModal :orderView=usersOrders />
                    </td>
                </tr>
            </tbody>
        </v-table>
</template>
