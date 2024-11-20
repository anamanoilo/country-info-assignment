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
          class=" rounded-md bg-white"
        >
        <RouterLink :to="`/country/${country.countryCode.toLowerCase()}`" class="block p-2 rounded-md hover:bg-indigo-300">{{ country.name }}</RouterLink>
          
        </li>
  </ul>
  <p v-else>No countries match the search</p>
</div>
</template>
