<script lang="ts">
export default {
    name: "Login"
}
</script>

<template>
    <div class="login_wrapper">
        <form>
            <div>
                <label for="email">Email Address:</label>
                <input type="email" id="email" placeholder="Enter email">
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" placeholder="Enter password">
            </div>
            <button type="button" class="btn_green">Sign In</button>


        </form>
    </div>
</template>