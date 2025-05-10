<script lang="ts">
export default {
    name: "OrderModal",
    props: {
        orderView: {},
    }
}
</script>
<template>
    <v-container>
        <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn v-bind="activatorProps" color="surface-variant" text="View Order" variant="flat"></v-btn>
            </template>

            <template v-slot:default="{ isActive }">
                <v-card title="Order #">
                    <v-card-text>
                        <h4>Status: {{
                            orderView.orderStatus == 0 ? "In Progress" :
                                orderView.orderStatus == 1 ? "Ready for Pickup" :
                                    orderView.orderStatus == 2 ? "Out for Delivery" :
                                        orderView.orderStatus == 3 ? "Completed" :
                                            "Oops! Something went wrong. If this messer persists, please contact the store."
                        }}</h4>
                        <v-table>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Size</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                </tr>
                                <tr v-for="i in orderView.basket.items as any">
                                    <td>{{ i.name }}</td>
                                    <td>{{ i.size }}</td>
                                    <td>${{ i.price }}</td>
                                    <td>{{ i.quantity }}</td>
                                </tr>

                            </tbody>
                        </v-table>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text="Close" @click="isActive.value = false"></v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </v-container>
</template>
