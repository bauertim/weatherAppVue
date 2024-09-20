import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { MotionPlugin } from "@vueuse/motion";
const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(MotionPlugin);
app.mount("#app");
