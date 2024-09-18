// src/router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import AdminLogin from '../views/AdminLogin.vue';
import AdminDashboard from '../views/AdminDashboard.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: AdminLogin },
  { path: '/admin', component: AdminDashboard },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;