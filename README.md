# Vue Click Captcha 插件

这是一个基于Vue的点击验证码插件

## 安装

```bash
npm install click-captcha-v3 --save
# 或
pnpm add click-captcha-v3
```

## 使用方法

### 全局引入

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import ClickCaptchaV3 from 'click-captcha-v3'

const app = createApp(App)
app.use(ClickCaptchaV3, {
  // 全局配置
  autoHideStatus: true,
  requestHeaders: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})
app.mount('#app')
```

### 组件中使用

```vue
<template>
    <div class="demo-container">
        <h1>Vue点击验证码插件演示</h1>
        <button @click="showCaptcha = true">打开验证</button>
        <ClickCaptchaV3 
          ref="captchaRef" 
          :showCaptcha="showCaptcha" 
          :sourceUrl="sourceUrl"
          @point-selected="handlePointSelected" 
          @close="showCaptcha=false" 
        />
    </div>
</template>

<script setup name="App">
import { ref, computed } from 'vue'

const showCaptcha = ref(false)
const sourceUrl = ref("http://localhost:8848/api/captcha")
const captchaRef = ref(null)


const handlePointSelected = (data) => {
    console.log('验证码选择了点', data)
}
</script>
```
