import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {layout: 'empty'},
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {layout: 'empty'},
      component: () => import('../views/register.vue')
    },
    {
      path: '/',
      name: 'home',
      meta: {layout: 'main', auth:true},
      component: () => import('../views/Home.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      meta: {layout: 'main', auth:true},
      component: () => import('../views/Categories.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      meta: {layout: 'main', auth:true},
      component: () => import('../views/detail-record.vue')
    },
    {
      path: '/history',
      name: 'history',
      meta: {layout: 'main', auth:true},
      component: () => import('../views/history.vue')
    },
    {
      path: '/planning',
      name: 'planning',
      meta: {layout: 'main', auth:true},
      component: () => import('../views/planing.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {layout: 'main', auth:true},
      component: () => import('../views/profile.vue')
    },
    {
      path: '/record',
      name: 'record',
      meta: {layout: 'main', auth:true},
      component: () => import('../views/record.vue')
    }
  ]
})
router.beforeEach((t,f,n)=>{
  const currentUser = firebase.auth().currentUser
  const requiredAuth = t.matched.some(rec => rec.meta.auth)
  if (requiredAuth && !currentUser) {
    n('/login?message=login')
  }
  else{
    n()
  }
})
export default  router
