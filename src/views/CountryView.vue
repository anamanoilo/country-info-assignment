<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, watch, inject } from 'vue';
import { axiosKey, CountryInfo, Holiday } from '../types';
import { AxiosError } from 'axios';
import type { AxiosInstance } from 'axios';

const axios = inject(axiosKey) as AxiosInstance;

const route = useRoute();
const countryCode = route.params.countryCode;

const loading = ref(false);
const country = ref<CountryInfo | null>(null);
const error = ref<null | string>(null);
const holidays = ref<Holiday[]>([]);
const selectedYear = ref(new Date().getFullYear());

const datesOptions = [
  2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
];

// watch the params of the route to fetch the data again
watch(() => countryCode as string, getData, { immediate: true });

// watch the click on the year button to fetch holidays for the selected year
watch(selectedYear, getHolidays);

async function getData(countryCode: string) {
  error.value = country.value = null;
  holidays.value = [];
  loading.value = true;

  try {
    country.value = await fetchCountryInfo(countryCode);
    holidays.value = await fetchHolidays(selectedYear.value, countryCode);
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error(err.message);
      error.value = err.message.toString();
    } else {
      console.error('Unknown error:', err);
    }
  } finally {
    loading.value = false;
  }
}

async function getHolidays() {
  error.value = null;
  holidays.value = [];
  loading.value = true;

  try {
    holidays.value = await fetchHolidays(
      selectedYear.value,
      countryCode as string,
    );
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error(err.message);
      error.value = err.message.toString();
    } else {
      console.error('Unknown error:', err);
    }
  } finally {
    loading.value = false;
  }
}

async function fetchCountryInfo(countryCode: string): Promise<CountryInfo> {
  const response = await axios.get(`/CountryInfo/${countryCode}`);
  return response.data;
}

async function fetchHolidays(
  year: number,
  countryCode: string,
): Promise<Holiday[]> {
  const response = await axios.get(`/PublicHolidays/${year}/${countryCode}`);
  return response.data;
}
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>

    <div v-if="error">
      {{ error }}
    </div>

    <div v-if="country && holidays.length">
      <h3 class="font-semibold">{{ country.commonName }}</h3>
      <p>Official name: {{ country.officialName }}</p>
      <ul class="mt-4 grid gap-2">
        <li v-for="holiday in holidays" class="p-2 border-2 rounded-md border-gray-400">
          <p>Holiday: {{ holiday.name }}</p>
          <p>Date 📅: {{ holiday.date }}</p>
          <div v-for="type in holiday.types">§{{ type }}</div>
        </li>
      </ul>
      <div class="flex justify-center flex-wrap mt-4 gap-2">
        <button
          v-for="year in datesOptions"
          @click="selectedYear = year"
          :key="year"
          class="p-2 border-2 rounded-md border-gray-400 hover:bg-gray-200 hover:border-gray-500 focus:outline-none focus:border-gray-500 focus:bg-gray-300"
        >
          {{ year }}
        </button>
      </div>
    </div>
  </div>
</template>
