import ClickCaptchaV3 from './components/ClickCaptchaV3.vue'

export default {
  install(app, options = {}) {
    // 注册全局组件
    app.component('ClickCaptchaV3', ClickCaptchaV3)
  }
}

// 导出组件，以便可以按需引入
export { ClickCaptchaV3 }
