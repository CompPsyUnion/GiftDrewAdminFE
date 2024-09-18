<template>
    <div class="login-container">
        <h2>Admin Login</h2>
        <input type="password" v-model="password" placeholder="Enter admin password" />
        <button @click="login">Login</button>
        <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script>
export default {
    name: "AdminLogin",
    data() {
        return {
            password: '',
            errorMessage: '',
        };
    },
    methods: {
        login() {
            if (this.password === 'adminpassword') {
                this.$router.push('/admin');
            } else {
                this.errorMessage = 'Incorrect password';
            }
        },
    },
};
</script>

<style>
/* Add some basic styles */
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
</style>