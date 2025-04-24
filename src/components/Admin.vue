<script lang="ts">
import NewPizza from './NewPizza.vue';
import Login from './Login.vue';
import { useMenuStore } from '@/stores/store';
import type { Item } from '@/stores/Item';

export default {
    name: "Admin",
    components: {
        NewPizza,
        Login
    },
    setup() {
        const menuStore = useMenuStore()
        return { menuStore }
    },
    methods: {
        signOut() {
            useMenuStore().signOut()
        },
        removeItem(item: Item) {
            useMenuStore().removeItem(item)
        }
    }
}
</script>
<template>
    <div class="admin_wrapper">
        <div class="current_user_wrapper">
            <span>Logged in as: {{ menuStore.currentUser?.email }}</span>
            <button type="button" class="btn_red" @click="signOut()">Sign Out</button>
        </div>
        <NewPizza></NewPizza>
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
                            <button type="button" class="btn_red">&times;</button>
                        </th>
                    </tr>
                    <tr v-for="orderItem in order.items as Item[]" :key="orderItem.name + index">
                        <td>{{ orderItem.name }}</td>
                        <td>${{ orderItem.price }}</td>
                        <td>{{ orderItem.size }}"</td>
                        <td>Qty: {{ orderItem.quantity }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Login />
    </div>
</template>

<style scoped>
.admin_wrapper {
    margin: 10px;
}

.current_user_wrapper,
.order_wrapper,
.menu_wrapper {
    margin: 10px 0;
    padding: 10px;
    border: solid 1px #f79e38;

}

table {
    text-align: left;
    width: 70vw;
}

.order_number th {
    background: #ddd;
}

.order_number button {
    margin: 0 10px;

}
</style>