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
    <v-table class="d-flex">
        <thead class="text-center">
            <tr>
                <th>
                    Item Name
                </th>
                <th>
                    Remove from Menu
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in menuStore.getMenuItems as any" :key="item.name">
                <td class="text-left">{{ item.name }}</td>
                <td class="text-center">
                    <v-btn class="mr-4" icon="mdi-delete" density="compact" @click="removeItem(item)"></v-btn>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>