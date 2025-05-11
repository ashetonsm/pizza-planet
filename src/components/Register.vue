<script lang="ts">
import { useMenuStore } from '@/stores/store';

export default {
    name: "Register",
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        createUser() {
            const user = {
                email: this.email,
                password: this.password
            }

            useMenuStore().createUser(user.email, user.password);
        },
        async submit(event: any) {
            this.createUser()
        },
    }
}
</script>

<template>
    <v-sheet class="mx-auto rounded" max-width="300">
        <v-card class="mx-auto px-6 py-8" max-width="344" title="Register">
            <v-form validate-on="submit" @submit.prevent="submit">
                <v-text-field v-model=email label="Email:" type="email"></v-text-field>
                <v-text-field v-model=password label="Password:" type="password"></v-text-field>
                <v-btn class="mt-2" text="Submit" type="submit" color="primary" block></v-btn>
            </v-form>
        </v-card>
    </v-sheet>
</template>