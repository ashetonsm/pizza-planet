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
            this.menuStore.removeItem(item)
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
                this.menuStore.removeOrder(order)
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
    <v-card class="mx-auto px-6 text-left" title="Add to Menu">
        <v-card-item class="align-items-center justify-center">
            <NewMenuItem />
        </v-card-item>
    </v-card>
    <v-card class="mx-auto px-6" title="Remove From Menu">
        <v-card-item class="align-items-center justify-center">
            <RemoveMenuItem />
        </v-card-item>
    </v-card>
</template>
