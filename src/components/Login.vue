<script lang="ts">
import { useMenuStore } from '@/stores/store';
import Register from './Register.vue';
import { ref } from 'vue';

export default {
    name: "Login",
    components: {
        Register
    },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        signIn() {
            const user = {
                username: this.email,
                password: this.password
            }
            useMenuStore().signIn(user.username, user.password);
        },
        async submit(event: any) {
            this.signIn()
        },
    }
}


</script>

<template>
    <p>Please Sign In to Continue:</p>

    <v-sheet class="mx-auto" max-width="300">
        <v-card class="mx-auto px-6 py-8" max-width="344" title="Sign In">

            <v-form validate-on="submit" @submit.prevent="submit">
                <v-text-field v-model=email label="Email:" type="email"></v-text-field>
                <v-text-field v-model=password label="Password:" type="password"></v-text-field>

                <v-btn class="mt-2" text="Submit" type="submit" block></v-btn>
            </v-form>
        </v-card>
    </v-sheet>
    <Register></Register>
</template>