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
    valor= JSON.parse(logeado);
  }
  let protegido = to.matched.some(record => record.meta.requiresAuth)
  //console.log(to,from,"eds",protegido, valor );
  
  if(protegido && valor){
      console.log(`${to.path} protegida, logeado:${valor}`)
      next();
  }else if(protegido && !valor){
    console.log(`${to.path} protegida, sin logeo:${valor}`)
    next({name:"SignIn"});
  }else if(!protegido && valor){
    console.log(`${to.path} no protegida, logeado:${valor}`)
    next();
  }else{
    console.log(`${to.path} no protegida, no logeado:${valor}`)
      next();
  }
});

export default router
