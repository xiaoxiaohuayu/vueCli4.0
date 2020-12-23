import Vue from 'vue'
import App from './App.vue'
import antd from 'ant-design-vue'
import VueRouter from 'vue-router'
import 'regenerator-runtime/runtime';
import NProgress from 'nprogress';
import "@/icons/index.js";
import directiveList  from "@/tools/instructions.js";
// import { LazyLoad }  from "@/tools/instructions.js";
import  router  from './router/index'
import 'ant-design-vue/dist/antd.css'
Vue.config.productionTip = false;

import vhCheck from 'vh-check';
//解决移动端浏览器100vh高度不一致你以为的 100vh === 视口高度 实际上 100vh === 视口高度 + 浏览器工具栏（地址栏等等）的高度
vhCheck('browser-address-bar');
//注册全局的自定义指令
for (let iterator in directiveList) {
  if(iterator,directiveList[iterator] !=='LazyLoad'){
    Vue.directive(iterator,directiveList[iterator]);
  }
}
Vue.use(antd)

// -----
const LazyLoad = {
  // install方法
  install(Vue, options) {
      console.log(options)
      // options.default = 'https://ww3.sinaimg.cn/bmiddle/005ZupIhly1ghxmrr4kzvj326o2z8x6q.jpg';
    const defaultSrc = options && options.default;
  //   const defaultSrc = 'https://ww3.sinaimg.cn/bmiddle/005ZupIhly1ghxmrr4kzvj326o2z8x6q.jpg';
    Vue.directive('lazy', {
      bind(el, binding) {
        LazyLoad.init(el, binding.value, defaultSrc)
        LazyLoad.init(el, binding.value)
      },
      inserted(el) {
        if (IntersectionObserver) {
          LazyLoad.observe(el)
        } else {
          LazyLoad.listenerScroll(el)
        }
      },
    })
  },
  // 初始化
  init(el, val, def) {
      console.log('111',def)
    el.setAttribute('data-src', val)
    el.setAttribute('src', def)
  },
  // 利用IntersectionObserver监听el
  observe(el) {
    var io = new IntersectionObserver((entries) => {
      const realSrc = el.dataset.src
      if (entries[0].isIntersecting) {
        if (realSrc) {
          el.src = realSrc
          el.removeAttribute('data-src')
        }
      }
    })
    io.observe(el)
  },
  // 监听scroll事件
  listenerScroll(el) {
    const handler = LazyLoad.throttle(LazyLoad.load, 300)
    LazyLoad.load(el)
    window.addEventListener('scroll', () => {
      handler(el)
    })
  },
  // 加载真实图片
  load(el) {
    const windowHeight = document.documentElement.clientHeight
    const elTop = el.getBoundingClientRect().top
    const elBtm = el.getBoundingClientRect().bottom
    const realSrc = el.dataset.src
    if (elTop - windowHeight < 0 && elBtm > 0) {
      if (realSrc) {
        el.src = realSrc
        el.removeAttribute('data-src')
      }
    }
  },
  // 节流
  throttle(fn, delay) {
    let timer
    let prevTime
    return function (...args) {
      const currTime = Date.now()
      const context = this
      if (!prevTime) prevTime = currTime
      clearTimeout(timer)

      if (currTime - prevTime > delay) {
        prevTime = currTime
        fn.apply(context, args)
        clearTimeout(timer)
        return
      }

      timer = setTimeout(function () {
        prevTime = Date.now()
        timer = null
        fn.apply(context, args)
      }, delay)
    }
  },
}
// -----
Vue.use(LazyLoad,Vue,{
  default:'https://ww3.sinaimg.cn/bmiddle/005ZupIhly1ghxmrr4kzvj326o2z8x6q.jpg'
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
