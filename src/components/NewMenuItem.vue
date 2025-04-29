<script lang="ts">
import type { Item, Options } from '@/stores/Item';
import { useMenuStore } from '@/stores/store.ts'

export default {
    name: 'NewMenuItem',
    data() {
        return {
            newMenuItem: {
                name: 'Eg. Margherita',
                description: 'Eg. A delicious tomato based pizza topped with mozzarella',
                quantity: 1,
                options: [{
                    size: 9,
                    price: 6.95
                } as Options, {
                    size: 12,
                    price: 10.95
                } as Options]
            } as Item
        }
    },
    methods: {
        add() {
            useMenuStore().addNewMenuItem(this.newMenuItem)
        }
    }
}
</script>

<template>
    <form>
        <h3>Add New Menu Item:</h3>
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="newMenuItem.name">
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea type="text" id="description" v-model="newMenuItem.description" rows="5"></textarea>
        </div>
        <p>
            <strong>Option 1:</strong>
        </p>
        <div class="form-group">
            <label for="size1">Size (")</label>
            <input type="text" id="size1" v-model="newMenuItem.options[0].size">
        </div>
        <div class="form-group">
            <label for="price1">Price</label>
            <input type="text" id="price1" v-model="newMenuItem.options[0].price">
        </div>
        <p>
            <strong>Option 2:</strong>
        </p>
        <div class="form-group">
            <label for="size2">Size (")</label>
            <input type="text" id="size2" v-model="newMenuItem.options[1].size">
        </div>
        <div class="form-group">
            <label for="price2">Price</label>
            <input type="text" id="price2" v-model="newMenuItem.options[1].price">
        </div>
        <button type="button" class="btn_green" @click="add">Add</button>
        {{ newMenuItem }}
    </form>
</template>

<style></style>