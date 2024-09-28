<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, watch, inject } from 'vue';
import {axiosKey, CountryInfo, Holiday } from '../types';
import { AxiosError } from 'axios';
import type { AxiosInstance } from 'axios';

const axios = inject(axiosKey) as AxiosInstance;

const route = useRoute();

const loading = ref(false);
const country = ref<CountryInfo | null>(null);
const error = ref<null | string>(null);
const holidays = ref<Holiday[]>([]);

// watch the params of the route to fetch the data again
watch(() => route.params.countryCode as string, fetchData, { immediate: true });

async function fetchData(countryCode: string) {
  error.value = country.value = null;
  holidays.value = [];
  loading.value = true;

  const defaultYear = new Date().getFullYear();

  try {
    country.value = await fetchCountryInfo(countryCode);
    holidays.value = await fetchHolidays(defaultYear, countryCode);
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

async function fetchHolidays(year:number, countryCode: string): Promise<Holiday[]> {
  const response = await axios.get(`/PublicHolidays/${year}/${countryCode}`);
  return response.data;
}
</script>

<template>
  <h2>CountryView</h2>
  <div class="country">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" style="background-color: red" class="error">
      {{ error }}
    </div>

    <div v-if="country" class="content">
      <h3>{{ country.commonName }}</h3>
      <p>{{ country.officialName }}</p>

      <div v-for="holiday in holidays">
        {{ holiday.name }}
        {{ holiday.date }}
        <div v-for="type in holiday.types">§{{ type }}</div>
      </div>
    </div>
  </div>
</template>
