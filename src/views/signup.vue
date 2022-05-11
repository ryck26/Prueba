<template>
    <nav>
    <router-link to="/">home</router-link> |
    <router-link to="/signin">SignIn</router-link>
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
          <button @click="save" class="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Save
          </button>
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


const email= ref<null|string>();
const contrasena= ref<null|string>();
const storage = useStorage();
let schema = yup.object().shape({
  email: yup.string().email(),
  pass: yup.string().required(),
});


function save(){
  schema
  .isValid({
    name: email.value,
    pass: contrasena.value,
  })
  .then(function (valid) {
    if(valid){ // => true
    console.log(email.value,contrasena.value)
     /// storage.setStorageSync("test-key", {email:email.value,pass:contrasena.value});
      localStorage.setItem("pro_test-key",JSON.stringify({email:email.value,pass:contrasena.value}));
      Swal.fire({
        title: 'Registro exitoso!',
        text: 'Registro almacenado',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Datos erroneos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  });
  
}

</script>
