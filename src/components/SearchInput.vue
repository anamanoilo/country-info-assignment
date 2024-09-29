<script setup lang="ts">
const modelValue = defineModel<string>('modelValue');

</script>

<template>
      <div class="mb-4">
    <input
      type="text"
      v-model="modelValue"
      placeholder="Search for a country..."
      class="w-full p-2 border-2 border-gray-300 rounded-md hover:border-gray-700 focus:border-gray-500"
    />
  </div>
</template>