import { createApp } from "vue";
import { createPinia } from "pinia";
import SvgIcon from "@/components/SvgIcon/index.vue"; // svg component
import "normalize.css/normalize.css";

import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import locale from "element-plus/dist/locale/en.mjs";
import "default-passive-events"

import "virtual:svg-icons-register";
import "@/styles/index.scss";

import "@/permission";
const pinia = createPinia();

const app = createApp(App);


// register globally
app.use(pinia);
app.component("svg-icon", SvgIcon);
app.use(ElementPlus, { locale });

app.use(router);

app.mount("#app");
