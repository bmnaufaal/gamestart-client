<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './views/components/Navbar.vue'
</script>

<template>
  <Navbar />
  <router-view></router-view>
</template>
