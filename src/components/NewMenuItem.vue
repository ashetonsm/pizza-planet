<script lang="ts">
import type { Item, Options } from '@/stores/Item';
import { useMenuStore } from '@/stores/store.ts'

export default {
    name: 'NewMenuItem',
    data() {
        return {
            newMenuItem: {
                name: 'Test Item',
                description: 'A delicious test item for testing.',
                quantity: 1,
                options: [{
                    size: 1,
                    price: 1.99
                } as Options, {
                    size: 2,
                    price: 2.99
                } as Options]
            } as Item
        }
    },
    setup() {
        const menuStore = useMenuStore()
        return { menuStore }
    },
    methods: {
        add() {
            this.menuStore.addNewMenuItem(this.newMenuItem)
        }
    }
}
</script>

<template>
    <v-responsive min-width="50vw">

        <v-form validate-on="submit" @submit.prevent="add()">
            <v-text-field v-model=newMenuItem.name label="Menu Item Name:" type="text"></v-text-field>
            <v-text-field v-model=newMenuItem.description label="Item Description:" type="text"></v-text-field>
            <p>Option 1:</p>
            <p>Price:</p>
            <v-text-field v-model=newMenuItem.options[0].size label="Size:" type="text"></v-text-field>
            <p>Size:</p>
            <v-text-field v-model=newMenuItem.options[0].price label="Price:" type="text"></v-text-field>
            <p>Option 2:</p>
            <p>Price:</p>
            <v-text-field v-model=newMenuItem.options[1].size label="Size:" type="text"></v-text-field>
            <p>Size:</p>
            <v-text-field v-model=newMenuItem.options[1].price label="Price:" type="text"></v-text-field>
            <v-btn variant="tonal" class="mt-2" text="Add" type="submit" block></v-btn>
        </v-form>
    </v-responsive>

</template>

<style></style>