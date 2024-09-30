<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import CountryList from '../components/CountryList.vue';
import SearchInput from '../components/SearchInput.vue';
import RandomCountryWidget from '../components/RandomCountryWidget.vue';
import { Country } from '../types';
import { useFetch } from '../composables/useFetch';

const searchQuery = ref('');
const randomCountries = ref<Country[] | null>(null);
const fetchCountriesUrl = ref('/AvailableCountries');

const {
  data: countries,
  error: countriesError,
  loading: loadingCountries,
} = useFetch<Country[] | null>(fetchCountriesUrl);

// Filter countries based on search query
const filteredCountries = computed(() => {
  if (Array.isArray(countries.value)) {
    return countries.value.filter((country) =>
      country.name
        .toLowerCase()
        .includes(searchQuery.value.trim().toLowerCase()),
    );
  }
  return null;
});

// Generate random countries when country list is fetched
watch(countries, () => {
  if (countries.value?.length) {
    generateRandomCountries();
  }
});

function generateRandomCountries() {
  if (Array.isArray(countries.value)) {
    const generatedRandomCountries = [];
    for (let i = 0; i < 3; i++) {
      const country =
        countries.value[Math.floor(Math.random() * countries.value.length)];
      generatedRandomCountries.push(country);
    }
    randomCountries.value = generatedRandomCountries;
  }
}
</script>

<template>
  <div v-if="loadingCountries">Loading countries...</div>

  <div v-if="countriesError">
    {{ countriesError }}
  </div>

  <div v-else class="grid grid-cols-1 lg:grid-cols-5 gap-8">
    <div class="lg:col-span-2 lg:order-1 order-2">
      <div v-if="filteredCountries">
        <SearchInput v-model="searchQuery" />
        <CountryList :filteredCountries="filteredCountries" />
      </div>
    </div>
    <div class="lg:col-span-3 lg:order-2 order-1 h-fit">
      <RandomCountryWidget
        v-if="randomCountries"
        :randomCountries="randomCountries"
      />
    </div>
  </div>
</template>
