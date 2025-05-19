<script lang="ts">
import { useMenuStore } from '@/stores/store';
import Register from './Register.vue';

export default {
    name: "Login",
    components: {
        Register
    },
    setup() {
        const menuStore = useMenuStore()
        return { menuStore }
    },
    data() {
        return {
            displayRegistration: false,
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
            this.menuStore.signIn(user.username, user.password)
        },
        toggleView() {
            if (this.displayRegistration === false) {
                this.displayRegistration = true;
            } else {
                this.displayRegistration = false
            }
        }
    }
}


</script>

<template>
    <v-container class="d-flex">
        <v-btn-toggle rounded="xl" class="mx-auto" color="secondary">
            <v-btn :active="displayRegistration === false ? true : false" @click="toggleView">Sign In</v-btn>
            <v-btn :active="displayRegistration === true ? true : false" @click="toggleView">Register</v-btn>
        </v-btn-toggle>
    </v-container>

    <v-sheet class="mx-auto rounded" max-width="300">
        <v-card v-if="displayRegistration !== true" class="mx-auto px-6 py-8" max-width="344" title="Sign In">
            <v-form>
                <v-text-field v-model=email label="Email:" type="email"></v-text-field>
                <v-text-field v-model=password label="Password:" type="password"></v-text-field>
                <v-btn class="mt-2" @click="signIn" text="Submit" type="button" color="primary" block></v-btn>
            </v-form>
        </v-card>
        <Register v-if="displayRegistration === true"></Register>
    </v-sheet>
</template>