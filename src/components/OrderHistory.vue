<script lang="ts">
import { useMenuStore } from '@/stores/store';
import OrderModal from '@/components/OrderModal.vue';

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
        removeOrder(order: any) {
            if (confirm('Remove Order?')) {
                useMenuStore().removeOrder(order)
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
        <!-- This is a list of each indexed order ([0], [1], etc) -->
        <tbody v-for="(orderArray, index) in menuStore.orders" :key="index">
            <tr class="text-h5 text-center">
                <th class="text-h5 text-center">Remove</th>
                <th class="text-h5 text-center">Email</th>
                <th class="text-h5 text-center">Order Status</th>
                <th class="text-h5 text-center">Details</th>
            </tr>
            <tr v-for="(usersOrders, index) in orderArray as any" :key="usersOrders.date + index">
                <th class="text-center"><v-btn density="compact" icon="mdi-delete"
                        @click="removeOrder(usersOrders)"></v-btn></th>
                <th class="text-center">{{ usersOrders.userEmail }}</th>

                <td class="text-center">{{
                    usersOrders.orderStatus == 0 ? "In Progress" :
                        usersOrders.orderStatus == 1 ? "Ready for Pickup" :
                            usersOrders.orderStatus == 2 ? "Out for Delivery" :
                                usersOrders.orderStatus == 3 ? "Completed" :
                                    "Oops! Something went wrong. If this messer persists, please contact the store."
                }}</td>
                <td class="text-center">
                    <OrderModal :orderView=usersOrders />
                </td>
            </tr>
        </tbody>
    </v-table>
</template>
