<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/country/hu">Go to Country HU</RouterLink>
  </nav>
  <main style="background-color: yellow;">
    <RouterView />
  </main>
</template>

