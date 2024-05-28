import { createRouter, createWebHistory } from "vue-router";
import LogIn from "./components/LogIn.vue";
import SignUp from "./components/SignUp.vue";
import TodoList from "./components/TodoList.vue";
import HomeVue from "./components/HomeVue.vue";

const routes = [
  {
    path: "/",
    component: HomeVue,
  },
  {
    path: "/login",
    component: LogIn,
  },
  {
    path: "/signup",
    component: SignUp,
  },
  {
    path: "/todos",
    component: TodoList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
