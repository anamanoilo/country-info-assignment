<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { CountryInfo, Holiday } from '../types';
import { useFetch } from '../composables/useFetch';
import { generateYearsList } from '../utils/generateYearsList';
import { Year } from '../utils/constants';


const route = useRoute();
const countryCode = route.params.countryCode;
const selectedYear = ref(new Date().getFullYear());
const fetchCountryInfoUrl = computed(() => `/CountryInfo/${countryCode}`);
const fetchHolidaysUrl = computed(
  () => `/PublicHolidays/${selectedYear.value}/${countryCode}`
);

const yearsOptions = generateYearsList(Year.START, Year.END);
const {
  data: country,
  error: countryError,
  loading: loadingCountryInfo,
} = useFetch<CountryInfo | null>(fetchCountryInfoUrl);
const {
  data: holidays,
  error: holidaysError,
  loading: loadingHolidays,
} = useFetch<Holiday[] | null>(fetchHolidaysUrl);

</script>

<template>
  <div>
    <div v-if="loadingCountryInfo">Loading...</div>

    <div v-if="countryError" class="text-red-800">
      {{ countryError }}
    </div>

    <div v-if="country">
      <h3 class="font-semibold">{{ country.commonName }}</h3>
      <p>Official name: {{ country.officialName }}</p>

      <div class="mt-4">
        <p v-if="loadingHolidays">
          Loading holidays for {{ selectedYear }} year...
        </p>

        <ul v-if="holidays?.length" class="grid gap-2">
          <li
            v-for="holiday in holidays"
            class="p-2 border-2 rounded-md border-gray-400"
          >
            <p>Holiday: {{ holiday.name }}</p>
            <p>Date 📅: {{ holiday.date }}</p>
            <p>
              Types: <span v-for="type in holiday.types">{{ type }}</span>
            </p>
          </li>
        </ul>

        <p v-if="holidays?.length === 0">No holidays found for this year</p>

        <p v-if="holidaysError" class="text-red-800">{{ holidaysError }}</p>

        <div v-if="holidays" class="flex justify-center flex-wrap mt-4 gap-2">
          <button
            v-for="year in yearsOptions"
            @click="selectedYear = year"
            :key="year"
            class="p-2 border-2 rounded-md border-gray-400 hover:bg-gray-200 hover:border-gray-500 focus:outline-none focus:border-gray-500 focus:bg-gray-300"
            :class="{
              'bg-gray-300': selectedYear === year,
              'border-gray-500': selectedYear === year,
            }"
          >
            {{ year }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
