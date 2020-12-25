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
import store from './store/index'
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
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
