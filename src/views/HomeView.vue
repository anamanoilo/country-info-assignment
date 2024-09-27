<script setup lang="ts">
import { ref, computed, inject } from 'vue';
import CountryList from '../components/CountryList.vue';
import SearchInput from '../components/SearchInput.vue';
import RandomCountryWidget from '../components/RandomCountryWidget.vue';
import { Country } from '../services/api.dto';

const axios = inject('axios');

const loading = ref(false);
// const countries = ref<Country[]>([]);
const error = ref(null);
const searchQuery = ref('');

const countries = ref([
  {
    countryCode: 'AD',
    name: 'Andorra',
  },
  {
    countryCode: 'AL',
    name: 'Albania',
  },
  {
    countryCode: 'AM',
    name: 'Armenia',
  },
  {
    countryCode: 'AR',
    name: 'Argentina',
  },
  {
    countryCode: 'AT',
    name: 'Austria',
  },
  {
    countryCode: 'AU',
    name: 'Australia',
  },
]);
async function fetchData() {
  error.value = null;
  countries.value = [];
  loading.value = true;

  try {
    countries.value = await fetchCountries();
  } catch (err) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}

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
  <div class="container px-4 mx-auto border-2 border-red-500">
    <h2>HomeView</h2>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
      <div class="lg:col-span-2 lg:order-1 order-2 border-2 border-orange-500">
        <SearchInput v-model="searchQuery" />
        <CountryList :filteredCountries="filteredCountries" />
      </div>
      <div class="lg:col-span-3 lg:order-2 order-1 border-2 border-green-500">
        <RandomCountryWidget />
      </div>
    </div>
  </div>

  <!-- <button @click="goToAbout">Go to About</button> -->
</template>
