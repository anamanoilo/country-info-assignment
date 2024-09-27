<script setup lang="ts">
import { ref } from 'vue';

  
interface Country {
  name: string;
  countryCode: string;
}


  const searchQuery = ref('');
  const countries = ref<Country[]>([]);


</script>

<template>
  <div>
      <input
      type="text"
        v-model="searchQuery"
        class="border p-2 rounded w-full"
        placeholder="Search for a country..."
      />
  <h3>Countries List</h3>
  <ul v-if="countries.length" class="mt-4">
     <li
          v-for="country in countries"
          :key="country.countryCode"
          class="cursor-pointer hover:underline"
        >
          {{ country.name }}
        </li>
  </ul>
</div>
</template>