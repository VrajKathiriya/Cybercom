import { createStore } from "vuex";
import auth from "./modules/auth/index";
import todo from "./modules/todo";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  modules: {
    auth,
    todo,
  },
  plugins: [
    createPersistedState({
      key: "my-app",
      paths: ["auth.token", "auth.user"],
    }),
  ],
});

export default store;
