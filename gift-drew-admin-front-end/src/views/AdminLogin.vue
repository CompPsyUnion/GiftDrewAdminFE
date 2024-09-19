<template>
    <div class="login-container">
        <h2>Admin Login</h2>
        <input type="password" v-model="password" placeholder="Enter admin password" />
        <button @click="login">Login</button>
        <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js';

export default {
    name: "AdminLogin",
    data() {
        return {
            password: '',
            errorMessage: '',
            hashedAdminPassword: "ea89ab92577833652c60db16d9969f4cac3620b8a7dac83e1eca2e57aaf268ec",
        };
    },
    methods: {
        login() {
            const hashedInputPassword = CryptoJS.SHA256(this.password).toString();
            if (hashedInputPassword === this.hashedAdminPassword) {
                localStorage.setItem('isAuthenticated', 'true');  // 存储认证状态
                this.$router.push('/admin');
            } else {
                this.errorMessage = 'Incorrect password';
            }
        },
    },
};
</script>

<style>
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
</style>