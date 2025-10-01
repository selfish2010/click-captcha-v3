import { createApp } from "vue";
import App from "./App.vue";
import ClickCaptchaV3 from "./index.js";

const app = createApp(App);

// 全局注册点击验证码插件
app.use(ClickCaptchaV3);

app.mount("#app");
