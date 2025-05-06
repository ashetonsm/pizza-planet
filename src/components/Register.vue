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
        }
    }
}
</script>

<template>
    <div class="login_wrapper">
        <p>Create an Account:</p>
        <form>
            <div>
                <label for="email">Email Address:</label>
                <input type="email" id="email" v-model="email" placeholder="Enter email">
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" placeholder="Enter password">
            </div>
            <button type="button" class="btn_green" @click.prevent="createUser()">Create Account</button>
        </form>
    </div>
</template>