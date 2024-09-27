<script setup lang="ts">
</script>

<template>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/country/us">Go to US</RouterLink>
  </nav>
  <main style="background-color: yellowgreen;">
    <RouterView />
  </main>
</template>

