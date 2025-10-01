import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 9527, // 添加这行设置端口
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "ClickCaptcha",
      fileName: (format) => `click-captcha.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
