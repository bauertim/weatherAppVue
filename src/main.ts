import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { MotionPlugin } from "@vueuse/motion";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const pinia = createPinia();

const app = createApp(App);

app.use(Toast, {
  timeout: 2400,
});
app.use(pinia);
app.use(MotionPlugin);
app.mount("#app");
