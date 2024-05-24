import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Routes from "./routes";
import axios from "axios";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.prototype.$http = axios;

const router = new VueRouter({
  routes: Routes,
  mode: "history",
});

new Vue({
  render: (h) => h(App),
  router: router,
}).$mount("#app");
