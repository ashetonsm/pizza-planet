<script lang="ts">
import { useMenuStore } from '@/stores/store';
import type { Item } from '@/stores/Item';

export default {
    setup() {
        const menuStore = useMenuStore()
        return { menuStore }
    },
    methods: {
        removeItem(item: Item) {
            useMenuStore().removeItem(item)
        }
    }
}
</script>

<template>
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
</template>