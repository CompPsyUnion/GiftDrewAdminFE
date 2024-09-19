<template>
    <div class="login-container">
        <div class="login-box">
            <h2>Admin Login</h2>
            <input type="password" v-model="password" placeholder="Enter admin password" class="input-field" />
            <button @click="login" class="login-button">Login</button>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script>
import CryptoJS from "crypto-js";

export default {
    name: "AdminLogin",
    data() {
        return {
            password: "",
            errorMessage: "",
            hashedAdminPassword:
                "ea89ab92577833652c60db16d9969f4cac3620b8a7dac83e1eca2e57aaf268ec",
        };
    },
    methods: {
        login() {
            const hashedInputPassword = CryptoJS.SHA256(this.password).toString();
            if (hashedInputPassword === this.hashedAdminPassword) {
                localStorage.setItem("isAuthenticated", "true"); // 存储认证状态
                this.$router.push("/admin");
            } else {
                this.errorMessage = "Incorrect password";
            }
        },
    },
};
</script>

<style scoped>
/* 基本样式重置 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 背景样式 */
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f2f5;
}

/* 登录框 */
.login-box {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 100%;
    max-width: 400px;
}

/* 标题样式 */
h2 {
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    color: #333;
}

/* 输入框样式 */
.input-field {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1.25rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
    transition: border 0.3s;
}

/* 输入框悬停效果 */
.input-field:focus {
    border-color: #007bff;
}

/* 登录按钮样式 */
.login-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

/* 按钮悬停效果 */
.login-button:hover {
    background-color: #0056b3;
}

/* 错误信息样式 */
.error-message {
    color: #e74c3c;
    font-size: 0.9rem;
    margin-top: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .login-box {
        width: 90%;
        padding: 1.5rem;
    }

    h2 {
        font-size: 1.5rem;
    }

    .input-field,
    .login-button {
        font-size: 0.9rem;
        padding: 0.65rem;
    }
}
</style>