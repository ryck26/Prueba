<template>
  <div class="home">
    <nav>
    <router-link to="/">Profile</router-link> |
    <router-link to="/signup">Chsnge password</router-link> |
    <router-link to="/signin">Sign out</router-link>
  </nav>
  </div>
  <router-view/>
</template>

<script setup lang="ts">
import { ref} from 'vue';
 

</script>
