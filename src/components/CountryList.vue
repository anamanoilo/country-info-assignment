<script setup lang="ts">
import router from '../router';
import { Country } from '../types/types';

defineProps<{
  filteredCountries: Country[]
}>()


// Navigate to country page
    function navigateToCountry (countryCode: string)  {
      router.push({ name: 'country', params: { countryCode: countryCode.toLowerCase() } });
    };

</script>

<template>
  <div>
  <h3>Countries List</h3>
  <ul v-if="filteredCountries.length" class="mt-4">
     <li
          v-for="country in filteredCountries"
          :key="country.countryCode"
          class="p-3 cursor-pointer hover:underline"
        >
        <a @click="navigateToCountry(country.countryCode)">{{ country.name }}</a>
          
        </li>
  </ul>
</div>
</template>
