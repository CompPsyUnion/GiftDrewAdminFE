// src/router/index.js

import { createRouter, createWebHistory } from "vue-router"; // 使用 Vue 3 的路由创建方法
import AdminLogin from "../views/AdminLogin.vue";
import AdminDashboard from "../views/AdminDashboard.vue";

const routes = [
  {
    path: "/",
    name: "home",
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      if (isAuthenticated) {
        next("/admin"); // 已登录，重定向到 /admin
      } else {
        next("/login"); // 未登录，重定向到 /login
      }
    },
  },
  {
    path: "/login",
    name: "login",
    component: AdminLogin,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminDashboard,
    meta: { requiresAuth: true }, // 需要认证
  },
  // 其他路由...
];

const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 模式的路由历史记录
  routes,
});

// 导航守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated"); // 检查登录状态

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // 未认证，重定向到登录页
      next({ path: "/login" });
    } else {
      // 已认证，允许进入
      next();
    }
  } else {
    // 不需要认证的页面，允许进入
    next();
  }
});

export default router;
