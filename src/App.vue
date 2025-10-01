<template>
    <div class="demo-container">
        <h1>Vue点击验证码插件演示</h1>
        <button @click="showCaptcha = true">打开验证</button>
        <ClickCaptchaV3 ref="captchaRef" :showCaptcha="showCaptcha" :sourceUrl="sourceUrl"
            @point-selected="handlePointSelected" @close="showCaptcha=false" />
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

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    color: #333;
    background-color: #f5f5f5;
}

.demo-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    text-align: center;
    margin-bottom: 30px;
    color: #2c3e50;
}

h2 {
    margin-bottom: 15px;
    color: #34495e;
    font-size: 18px;
}
</style>
