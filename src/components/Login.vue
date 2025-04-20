<script lang="ts">

import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../firebase';



export default {
    name: "Login",
    data(vm) {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async signIn() {
            signInWithEmailAndPassword(firebaseAuth, this.email, this.password)
                .then((userCredential) => {
                    //Signed in
                    const user = userCredential.user;
                    alert('Welcome, ' + user.email);

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert('Error Code: ' + errorCode + '--- Error Message: ' + errorMessage);
                })
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