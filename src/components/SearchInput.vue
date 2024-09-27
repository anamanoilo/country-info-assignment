<script setup lang="ts">
import { ref } from 'vue';
const searchQuery = ref('');

</script>

<template>
<input
      type="text"
        v-model="searchQuery"
        class="border p-2 rounded w-full"
        placeholder="Search for a country..."
      />
</template>