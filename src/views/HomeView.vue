<script setup lang="ts">
import { ref, computed, inject, onMounted } from 'vue';
import CountryList from '../components/CountryList.vue';
import SearchInput from '../components/SearchInput.vue';
import RandomCountryWidget from '../components/RandomCountryWidget.vue';
import { axiosKey, Country } from '../services/api.dto';
import type { AxiosInstance } from 'axios';

const axios = inject('axios') as AxiosInstance;
// const axios = inject(axiosKey);


const loading = ref(false);
const countries = ref<Country[]>([]);
const error = ref(null);
const searchQuery = ref('');
const randomCountries = ref([]);

async function fetchData() {
  error.value = null;
  countries.value = [];
  loading.value = true;


  try {
    countries.value = await fetchCountries();

    // const randomCountries = <Country[]>[];
    // for (let i = 0; i < 3; i++){
    //   const randomCountry = countries.value[Math.floor(Math.random() * countries.value.length)];
    // randomCountries.push(randomCountry);
    // }
    // const countryWidgets = Promise.all(randomCountries.map(country => {}))
    const randomCountriesResponse = await Promise.all(
        Array(3)
          .fill(null)
          .map(async () => {
            const randomCountry =
              countries.value[Math.floor(Math.random() * countries.value.length)];
            const response = await axios.get(
              `/NextPublicHolidays/${randomCountry.countryCode}`
            );
            const randomCountryHolidays = response.data;
            return {
              name: randomCountry.name,
              holidayName: randomCountryHolidays[0].name,
              holidayDate: randomCountryHolidays[0].date,
              countryCode: randomCountry.countryCode,
            };
          })
    );
      randomCountries.value = randomCountriesResponse
  } catch (err) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}

onMounted(()=>{fetchData()})



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
  <div class="container px-4 mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
      <div class="lg:col-span-2 lg:order-1 order-2 p-2 border-2 border-gray-400">
        <SearchInput v-model="searchQuery" />
        <CountryList :filteredCountries="filteredCountries" />
      </div>
      <div class="lg:col-span-3 lg:order-2 order-1 p-2 border-2 border-gray-400">
        <RandomCountryWidget :randomCountries="randomCountries" />
      </div>
    </div>
  </div>
</template>
