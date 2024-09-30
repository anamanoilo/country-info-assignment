<script setup lang="ts">
import { Country } from '../types';
import RandomCountryItem from '../components/RandomCountryItem.vue';


defineProps<{
  randomCountries: Country[]
}>()

</script>

<template>
  <div class="p-2 border-2 rounded-md border-gray-200">
    <h3 class="font-semibold">Random Country Widget</h3>
    <ul v-if="randomCountries.length" class="min-h-[18.2rem] grid grid-rows-3 gap-2 mt-4">
      <li
        v-for="country in randomCountries"
        :key="country.countryCode"
      >
        <RandomCountryItem :randomCountry="country" />
      </li>
    </ul>
    </div>
</template>
