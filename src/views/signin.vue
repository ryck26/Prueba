<template>
    <nav>
    <router-link to="/">home</router-link> |
    <router-link to="/signup">SignUp</router-link> |
   
  </nav>
  <div class="about">
   <div class="w-full max-w-xs" >
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Email">
        </div>
        <div class="mb-6">
          <input v-model="contrasena" class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  type="password" placeholder="Password">
          
        </div>
        <div class="flex items-center justify-between">
          <button @click="login" class="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Sign In
          </button>
          <a class="inline-block align-baseline font-bold text-sm text-yellow-600 hover:text-yellow-800" href="#">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import { useStorage } from "vue3-storage";
import * as yup from 'yup';
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router';


const email= ref<null|string>();
const contrasena= ref<null|string>();
const storage = useStorage();
let schema = yup.object().shape({
  email: yup.string().email(),
  pass: yup.string().required(),
});
const router = useRouter();

 function login(){
  //console.log(email.value,contrasena.value);
   schema
  .isValid({
    name: email.value,
    pass: contrasena.value,
  })
  .then( function (valid) {
    if(valid){ // => true
     // storage.setStorageSync("test-key", {email:email.value,pass:contrasena.value});
     
      let datos=  localStorage.getItem("pro_test-key");
      let valor= false;
     
      if(typeof datos === 'string'){
        valor= JSON.parse(datos);
      }

      if(valor.email==email.value && valor.pass==contrasena.value){
          //storage.setStorageSync("logeado", true);
          console.log("Enviar",router);
          localStorage.setItem("pro_logeado",true);
         
          router.push({name: 'HomeLogin'});
   
         
          
      }
  
    }else{
      storage.setStorageSync("logeado", false);
      Swal.fire({
        title: 'Error!',
        text: 'Datos erroneos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      router.push({name: '/'});
      
    }
  });
}
</script>