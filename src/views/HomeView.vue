<script setup lang="ts">
import { ref, computed, inject, onMounted } from 'vue';
import CountryList from '../components/CountryList.vue';
import SearchInput from '../components/SearchInput.vue';
import RandomCountryWidget from '../components/RandomCountryWidget.vue';
import { axiosKey, Country, CountryWidget, Holiday } from '../types';
import { AxiosError } from 'axios';
import type { AxiosInstance } from 'axios';

const axios = inject(axiosKey) as AxiosInstance;

const loading = ref(false);
const countries = ref<Country[]>([]);
const error = ref<string | null>(null);
const searchQuery = ref('');
const randomCountries = ref<CountryWidget[]>([]);

async function fetchData() {
  error.value = null;
  countries.value = [];
  loading.value = true;

  try {
    countries.value = await fetchCountries();

    const randomCountriesResponse = await Promise.all(
      Array(3)
        .fill(null)
        .map(async () => {
          const randomCountry =
            countries.value[Math.floor(Math.random() * countries.value.length)];
          const response = await axios.get(
            `/NextPublicHolidays/${randomCountry.countryCode}`,
          );
          const randomCountryHolidays: Holiday[] = response.data;
          return {
            name: randomCountry.name,
            holidayName: randomCountryHolidays[0].name,
            holidayDate: randomCountryHolidays[0].date,
            countryCode: randomCountry.countryCode,
          };
        }),
    );
    randomCountries.value = randomCountriesResponse;
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

onMounted(() => {
  fetchData();
});

// Filter countries based on search query
const filteredCountries = computed(() =>
  countries.value.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.value.trim().toLowerCase()),
  ),
);

async function fetchCountries(): Promise<Country[]> {
  const response = await axios.get(`/AvailableCountries`);
  return response.data;
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
    <div class="lg:col-span-2 lg:order-1 order-2 p-2 border-2 border-gray-400">
      <SearchInput v-model="searchQuery" />
      <CountryList :filteredCountries="filteredCountries" />
    </div>
    <div
      class="lg:col-span-3 lg:order-2 order-1 h-fit p-2 border-2 border-gray-400"
    >
      <RandomCountryWidget :randomCountries="randomCountries" />
    </div>
  </div>
</template>
