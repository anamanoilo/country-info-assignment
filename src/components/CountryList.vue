<script setup lang="ts">
import { Country } from '../types';

defineProps<{
  filteredCountries: Country[]
}>()

</script>

<template>
  <div>
  <h3 class="font-semibold">Countries List</h3>
  <ul v-if="filteredCountries.length" class="mt-4 grid gap-2">
     <li
          v-for="country in filteredCountries"
          :key="country.countryCode"
          class="p-2 border-2 rounded-md border-gray-500"
        >
        <RouterLink :to="`/country/${country.countryCode.toLowerCase()}`" class="block hover:underline">{{ country.name }}</RouterLink>
          
        </li>
  </ul>
  <p v-else>No countries match the search</p>
</div>
</template>
