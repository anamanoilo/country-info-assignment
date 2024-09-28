<script setup lang="ts">
</script>

<template>
  <!-- <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p> -->
  <nav>
    <strong><RouterLink to="/">Go to Home</RouterLink></strong>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

