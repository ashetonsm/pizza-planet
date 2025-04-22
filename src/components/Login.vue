<script lang="ts">
import { useMenuStore } from '@/stores/store';



export default {
    name: "Login",
    data(vm) {
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
        }
    }
}


</script>

<template>
    <div class="login_wrapper">
        <form>
            <div>
                <label for="email">Email Address:</label>
                <input type="email" id="email" v-model="email" placeholder="Enter email">
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" placeholder="Enter password">
            </div>
            <button type="button" class="btn_green" @click.prevent="signIn()">Sign In</button>


        </form>
    </div>
</template>