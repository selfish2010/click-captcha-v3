import { withDirectives as g, openBlock as i, createElementBlock as a, createElementVNode as r, normalizeStyle as h, withModifiers as C, Fragment as d, renderList as p, createCommentVNode as u, createTextVNode as m, toDisplayString as y, vShow as k } from "vue";
const _ = (e, t) => {
  const l = e.__vccOpts || e;
  for (const [n, c] of t)
    l[n] = c;
  return l;
}, x = {
  name: "ClickCaptcha",
  props: {
    showCaptcha: {
      type: Boolean,
      default: !1
    },
    sourceUrl: {
      type: String,
      default: ""
    }
  },
  watch: {
    showCaptcha(e, t) {
      e && this.loadNewCaptcha();
    }
  },
  data() {
    return {
      sourceLoading: !0,
      source: {
        base64: "",
        text: [],
        width: "",
        height: ""
      },
      selectedPoints: []
      // 用户点击的坐标点
    };
  },
  computed: {
    // 容器样式（宽度和高度）
    containerStyle() {
      return {
        width: `${this.source.width}px`,
        height: `${this.source.height}px`
      };
    }
  },
  methods: {
    // 处理图片点击
    handleImageClick(e) {
      if (this.selectedPoints.length >= this.source.text.length)
        return;
      const t = e.currentTarget.getBoundingClientRect(), l = e.clientX - t.left, n = e.clientY - t.top;
      if (this.selectedPoints.push(l + "," + n), this.selectedPoints.length >= this.source.text.length) {
        let c = [
          this.selectedPoints.join("-"),
          this.source.width,
          this.source.height
        ].join(";");
        this.$emit("point-selected", c);
      }
    },
    // 刷新验证码
    refreshCaptcha() {
      this.selectedPoints = [], this.loadNewCaptcha();
    },
    // 加载新的验证码（可被外部调用）
    async loadNewCaptcha() {
      this.sourceLoading = !0, fetch(this.sourceUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((e) => e.json()).then((e) => {
        this.source = e.data;
      }).finally(() => {
        setTimeout(() => {
          this.sourceLoading = !1;
        }, 500);
      });
    },
    close() {
      this.$emit("close");
    }
  }
}, w = {
  key: 0,
  class: "source-loading"
}, v = { class: "captcha-bottom" }, P = {
  key: 0,
  class: "captcha-tip"
};
function S(e, t, l, n, c, o) {
  return g((i(), a("div", {
    class: "captcha-layer",
    onClick: t[2] || (t[2] = (...s) => o.close && o.close(...s))
  }, [
    r("div", {
      class: "click-captcha",
      style: h(o.containerStyle),
      onClick: C(() => !1, ["stop"])
    }, [
      r("div", {
        class: "captcha-image",
        style: h({ backgroundImage: `url(${c.source.base64})`, cursor: "pointer" }),
        onClick: t[0] || (t[0] = (...s) => o.handleImageClick && o.handleImageClick(...s))
      }, [
        (i(!0), a(d, null, p(c.selectedPoints, (s, f) => (i(), a("div", {
          key: f,
          class: "captcha-point",
          style: h(`left:${s.split(",")[0] - 2}px;top:${s.split(",")[1] - 2}px`)
        }, null, 4))), 128))
      ], 4),
      c.sourceLoading ? (i(), a("div", w, "加载中")) : u("", !0),
      r("div", v, [
        c.source.text.length > 0 ? (i(), a("div", P, [
          t[3] || (t[3] = m("请点击图片中的: ", -1)),
          (i(!0), a(d, null, p(c.source.text, (s) => (i(), a("span", { key: s }, " <" + y(s) + "> ", 1))), 128))
        ])) : u("", !0),
        r("div", {
          class: "captcha-refresh",
          onClick: t[1] || (t[1] = (...s) => o.refreshCaptcha && o.refreshCaptcha(...s))
        }, " 刷新 ")
      ])
    ], 4)
  ], 512)), [
    [k, l.showCaptcha]
  ]);
}
const V = /* @__PURE__ */ _(x, [["render", S], ["__scopeId", "data-v-6b3f7f8c"]]), N = {
  install(e, t = {}) {
    e.component("ClickCaptchaV3", V);
  }
};
export {
  V as ClickCaptchaV3,
  N as default
};
