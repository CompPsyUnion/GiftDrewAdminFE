import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 引入路由
import VueRouter from "vue-router";
Vue.use(VueRouter);
Vue.config.productionTip = false;

new Vue({
  router, // 把路由器注入到 Vue 实例中
  render: (h) => h(App),
}).$mount("#app");
