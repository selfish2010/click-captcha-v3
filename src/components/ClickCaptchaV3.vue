<template>
    <div v-show="showCaptcha" class="captcha-layer" @click="close">
        <div class="click-captcha" :style="containerStyle" @click.stop="() => { return false; }">
            <!-- 验证码背景图 -->
            <div class="captcha-image" :style="{ backgroundImage: `url(${source.base64})`, cursor: 'pointer' }"
                @click="handleImageClick">
                <!-- 已点击的点位 -->
                <div v-for="(item, index) in selectedPoints" :key="index" class="captcha-point"
                    :style="`left:${item.split(',')[0] - 2}px;top:${item.split(',')[1] - 2}px`"></div>
            </div>
            <div v-if="sourceLoading" class="source-loading">加载中</div>
            <div class="captcha-bottom">
                <!-- 点击提示文字 -->
                <div v-if="source.text.length > 0" class="captcha-tip">请点击图片中的:
                    <span v-for="value in source.text" :key="value">
                        <{{ value }}>
                    </span>
                </div>
                <!-- 刷新按钮 -->
                <div class="captcha-refresh" @click="refreshCaptcha">
                    刷新
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ClickCaptcha',
    props: {
        showCaptcha: {
            type: Boolean,
            default: false
        },
        sourceUrl: {
            type: String,
            default: ""
        },
    },
    watch: {
        showCaptcha(newVal, oldVal) {
            if (newVal) {
                this.loadNewCaptcha()
            }
        }
    },
    data() {
        return {
            sourceLoading: true,
            source: {
                base64: "",
                text: [],
                width: "",
                height: "",
            },
            selectedPoints: [], // 用户点击的坐标点
        }
    },
    computed: {
        // 容器样式（宽度和高度）
        containerStyle() {
            return {
                width: `${this.source.width}px`,
                height: `${this.source.height}px`
            }
        }
    },
    methods: {
        // 处理图片点击
        handleImageClick(event) {
            if (this.selectedPoints.length>=this.source.text.length) {
                return
            }
            const rect = event.currentTarget.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            // 记录点击坐标
            this.selectedPoints.push(x + "," + y);
            if (this.selectedPoints.length >= this.source.text.length) {
                let captchainfo = [
                    this.selectedPoints.join("-"),
                    this.source.width,
                    this.source.height
                ].join(";");
                this.$emit('point-selected', captchainfo)
            }
        },

        // 刷新验证码
        refreshCaptcha() {
            // 清空已选点
            this.selectedPoints = []
            this.loadNewCaptcha();
        },

        // 加载新的验证码（可被外部调用）
        async loadNewCaptcha() {
            this.sourceLoading = true
            fetch(this.sourceUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    this.source = data.data

                }).finally(() => {
                    setTimeout(() => {
                        this.sourceLoading = false
                    }, 500)

                })
        },
        close() {
            this.$emit('close')
        }
    }
}
</script>

<style scoped>
.captcha-layer {
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.click-captcha {
    width: 350px;
    box-sizing: content-box;
    position: fixed;
    z-index: 10000;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -100%);
    border-radius: 4px;
    /* box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.2); */
}

.source-loading {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .55);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
}

.captcha-image {
    position: relative;
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
    border-radius: 4px;
    overflow: hidden;
}

.captcha-bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}

.captcha-tip {
    background: rgba(0, 0, 0, 0.25);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 14px;
}

.captcha-refresh {
    display: block;
    background: rgba(0, 0, 0, 0.45);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
}

.captcha-refresh:hover {
    text-decoration: none;
}

.captcha-point {
    position: absolute;
    width: 12px;
    height: 12px;
    background: rgba(255, 0, 0, 0.6);
    border: 2px solid white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
}
</style>
