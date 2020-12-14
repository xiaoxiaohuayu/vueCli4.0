import Vue from 'vue'
import App from './App.vue'
import antd from 'ant-design-vue'
import VueRouter from 'vue-router'
import 'regenerator-runtime/runtime';
import NProgress from 'nprogress';
import "@/icons/index.js";
import  router  from './router/index'
import 'ant-design-vue/dist/antd.css'
Vue.config.productionTip = false;

import vhCheck from 'vh-check';
//解决移动端浏览器100vh高度不一致你以为的 100vh === 视口高度 实际上 100vh === 视口高度 + 浏览器工具栏（地址栏等等）的高度
vhCheck('browser-address-bar');
Vue.use(antd)
// router.beforeEach(() => {
//   NProgress.start();
// });
// router.afterEach(() => {
//   NProgress.done();
// });
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
