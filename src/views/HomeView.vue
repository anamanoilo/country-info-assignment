<script setup lang="ts">

import {ref} from 'vue';
import CountryList from '../components/CountryList.vue';
import SearchInput from '../components/SearchInput.vue';
import RandomCountryWidget from '../components/RandomCountryWidget.vue';

const loading = ref(false);
const countries = ref(null);
const error = ref(null);

async function fetchData() {
  error.value = countries.value = null;
  loading.value = true;

  try {
    countries.value = await fetchCountries();
  } catch (err) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}

async function fetchCountries(): Country[] {
  const response = await axios.get(`/AvailableCountries`);
  return response.data;
}

</script>

<template>
  <div class="container px-4 mx-auto border-2 border-red-500">
    <h2>HomeView</h2>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
      <div class="lg:col-span-2 lg:order-1 order-2 border-2 border-orange-500">
        <SearchInput />
        <CountryList :countries="countries" />
      </div>
      <div class="lg:col-span-3 lg:order-2 order-1 border-2 border-green-500">
        <RandomCountryWidget />
      </div>
    </div>
  </div>

  <!-- <button @click="goToAbout">Go to About</button> -->
</template>
