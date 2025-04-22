<script lang="ts">
import NewPizza from './NewPizza.vue';
import Login from './Login.vue';
import { firebaseAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useMenuStore } from '@/stores/store';

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
    computed: {},
    methods: {
        signOut() {
            useMenuStore().signOut()
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
                <tbody v-for="item in menuStore.getMenuItems" :key="item.name">
                    <tr>
                        <td>{{ item.name }}</td>
                        <td>
                            <button type="button" class="btn_red">&times;</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="orders_wrapper">
            <h3>Current Orders: ({{ menuStore.getNumberOfOrders }})</h3>
            <table>
                <thead>
                    <tr>
                        <th>
                            Item
                        </th>
                        <th>
                            Size
                        </th>
                        <th>
                            Quantity
                        </th>
                        <th>
                            Price
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="order_number">
                        <th colspan="4">
                            <strong>Order Number: {{ menuStore.getNumberOfOrders }}</strong>
                            <button type="button" class="btn_red">&times;</button>
                        </th>
                    </tr>
                    <tr>
                        <td>Margherita</td>
                        <td>9"</td>
                        <td>2</td>
                        <td>$13</td>
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