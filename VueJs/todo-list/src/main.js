import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/store";
import routes from "./routes";

const app = createApp(App);

app.use(routes);

app.use(store);
app.mount("#app");
