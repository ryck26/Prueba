import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/tailwind.css'
import Vue3Storage from "vue3-storage";

// Add a rule.
const app= createApp(App).use(router).use(Vue3Storage).mount('#app');


