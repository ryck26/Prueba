import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useStorage } from "vue3-storage";
import { object } from 'yup';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'SignUp',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "SignUp" */ '../views/signup.vue')
  },
  {
    path: '/signin',
    name: 'SignIn',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "SignIn" */ '../views/signin.vue')
  },
  {
    path: '/homeLogin',
    name: 'HomeLogin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeViewLogin.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach( (to,from,next)=>{
 
  let logeado= localStorage.getItem("pro_logeado");
  let valor= false;
  if(typeof logeado === 'string'){
    valor= JSON.parse(logeado).value;
  }
  let protegido = to.matched.some(record => record.meta.requiresAuth)
  //console.log(to,from,"eds",protegido, valor );
  
  if(protegido && valor){
      next();
  }else if(protegido && !valor){
    next({name:"SignIn"});
  }else if(!protegido && valor){
    next();
  }else{
      next();
  }
});

export default router
