/* 
    初始路由 
    注意 当初始化路由实例的时候 在main.js中需要用到的是实例而不是routes，以及需要注意 route 和 routers 的用词
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/layout/index'

Vue.use(VueRouter)


const routes = [
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/login')
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/about',
        name: 'About',
        component: () => import( '../views/About.vue')
      },
      {
        path: '/404',
        name: 'notFound',
        component: () => import( '../views/404.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
//   base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=> {
  console.log(to,from)
  if(to.name !=='login'){
    if(sessionStorage.getItem('token')){
      next()
    }else{
      router.push({
        path:'/login'
      })
    }
  }else{
    if(sessionStorage.getItem('token')){
      router.push({
        path:'/'
      })
    }else{
      next()
    }
  }
})
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
export default router
