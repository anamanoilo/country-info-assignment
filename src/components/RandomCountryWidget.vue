<script setup lang="ts">
import { CountryWidget } from '../types';


defineProps<{
  randomCountries: CountryWidget[]
}>()

</script>

<template>
    <h3 class="font-semibold">Random Country Widget</h3>
    <ul v-if="randomCountries.length" class="grid gap-2 mt-4">
      <li
        v-for="country in randomCountries"
        :key="country.countryCode"
      >
        <RouterLink :to="`/country/${country.countryCode.toLowerCase()}`" class="block p-2 border-2 rounded-md border-gray-500 hover:underline"
          ><p class= "font-semibold">{{ country.name }}</p
          ><p>Next Holiday: {{ country.holidayName }}</p
          ><p>Date: {{ country.holidayDate }}</p
          >
          </RouterLink
        >
      </li>
    </ul>
</template>
