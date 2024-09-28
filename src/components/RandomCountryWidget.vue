<script setup lang="ts">
import { CountryWidget } from '../types';


defineProps<{
  randomCountries: CountryWidget[]
}>()

</script>

<template>
  <div>
    <h3 class="font-semibold">Random Country Widget</h3>
    <ul class="grid gap-2 mt-4">
      <li
        v-for="country in randomCountries"
        :key="country.countryCode"
        class="p-2 border-2 border-gray-400"
      >
        <RouterLink :to="`/country/${country.countryCode.toLowerCase()}`" class="block hover:underline"
          ><p>Name: {{ country.name }}</p
          ><p>Next Holiday: {{ country.holidayName }}</p
          ><p>Date: {{ country.holidayDate }}</p
          >
          </RouterLink
        >
      </li>
    </ul>
  </div>
</template>
