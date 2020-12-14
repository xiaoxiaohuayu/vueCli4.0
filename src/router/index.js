/* 
    初始路由 
    注意 当初始化路由实例的时候 在main.js中需要用到的是实例而不是routes，以及需要注意 route 和 routers 的用词
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Home from '../views/layout/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children:[
      {
        path: '/about',
        name: 'about',
        component: () => import( '../views/About.vue')
      },
      {
        path: '/home',
        name: 'home',
        component: () => import( '../views/Home.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
//   base: process.env.BASE_URL,
  routes
})

export default router
