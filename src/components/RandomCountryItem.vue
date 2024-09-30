<script setup lang="ts">
import { computed } from 'vue';
import { Country, Holiday } from '../types';
import { useFetch } from '../composables/useFetch';

const { randomCountry } = defineProps<{
  randomCountry: Country;
}>();

const fetchCountryHolidaysUrl = computed(
  () => `/NextPublicHolidays/${randomCountry.countryCode}`,
);

const {
  data: holidays,
  error: countriesError,
  loading: loadingCountries,
} = useFetch<Holiday[] | null>(fetchCountryHolidaysUrl);
</script>

<template>
  <RouterLink
    :to="`/country/${randomCountry.countryCode.toLowerCase()}`"
    class="flex h-full p-2 border-2 rounded-md border-gray-500 hover:underline"
  >
    <p v-if="loadingCountries" class="content-center">
      Loading Random Country...
    </p>
    <div v-if="holidays" class="content-center">
      <p class="font-semibold">{{ randomCountry.name }}</p>
      <p>Next Holiday: {{ holidays[0].name }}</p>
      <p>Date: {{ holidays[0].date || 'N/A' }}</p>
    </div>
    <p v-if="countriesError" class="content-center">
      Could not load the country
    </p>
  </RouterLink>
</template>
