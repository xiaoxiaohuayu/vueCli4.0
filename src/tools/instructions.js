// 防抖函数
const debounce = {
    inserted: function (el, binding) {
      let timer
      el.addEventListener('click', () => {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          binding.value()
        }, 1000)
      })
    },
  }
/**
 * 
 * Dome 试列
<template>
  <button v-debounce="debounceClick">防抖</button>
</template>
<script>
export default {
  methods: {
    debounceClick () {
      console.log('只触发一次')
    }
  }
}
</script>
// -----------------------------------------------------
 */
// 懒加载指令
//思路：
/**
    1.图片懒加载的原理主要是判断当前图片是否到了可视区域这一核心逻辑实现的
    2.拿到所有的图片 Dom ，遍历每个图片判断当前图片是否到了可视区范围内
    3.如果到了就设置图片的 src 属性，否则显示默认图片

    图片懒加载有两种方式可以实现，一是绑定 srcoll 事件进行监听，二是使用 IntersectionObserver 判断图片是否到了可视区域，但是有浏览器兼容性问题。
    下面封装一个懒加载指令兼容两种方法，判断浏览器是否支持 IntersectionObserver API，如果支持就使用 IntersectionObserver 实现懒加载，否则则使用 srcoll 事件监听 + 节流的方法实现
 */
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
  
/**
 * <img v-LazyLoad="xxx.jpg" />
 */
// -----------------------------------------------------
//权限指令
function checkArray(key) {
    //次数组是有权限的判断key，可以放到全局的变量下
    let arr = ['1', '2', '3', '4'];
    let index = arr.indexOf(key)
    if (index > -1) {
      return true // 有权限
    } else {
      return false // 无权限
    }
  }
  
const permission = {
    inserted: function (el, binding) {
        let permission = binding.value // 获取到 v-permission的值
        if (permission) {
        let hasPermission = checkArray(permission)
        if (!hasPermission) {
            // 没有权限 移除Dom元素
            el.parentNode && el.parentNode.removeChild(el)
        }
        }
    },
}
/**
 //使用
 <div class="btns">
  <!-- 显示 -->
  <button v-permission="'1'">权限按钮1</button>
  <!-- 不显示 -->
  <button v-permission="'10'">权限按钮2</button>
</div>

 */
// -----------------------------------------------------
//拖拽指令 
/**
 * 个人推荐拖拽的尽量使用插件，计算更准确
 * 
 */
// 这种写法可以批量注册指令
// export default {
//     install (Vue) {
//       Object.keys(directives).forEach((key) => {
//         Vue.directive(key, directives[key])
//       })
//     }
//   }
  export default {
    debounce,
    LazyLoad,
    permission
  }
  