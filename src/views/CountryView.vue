<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { getPost } from './api.js';

import { onBeforeRouteUpdate } from 'vue-router';

onBeforeRouteUpdate(async (to, from) => {
  // react to route changes...
  // userData.value = await fetchUser(to.params.id);
});

import { inject } from 'vue';

const axios = inject('axios');

const router = useRouter();
const route = useRoute();

const loading = ref(false);
const country = ref(null);
const error = ref(null);

// watch the params of the route to fetch the data again
watch(() => route.params.countryCode, fetchData, { immediate: true });

async function fetchData(countryCode) {
  error.value = country.value = null;
  loading.value = true;

  try {
    country.value = await fetchCountryInfo(countryCode);
  } catch (err) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}

async function fetchCountryInfo(countryCode: string) {
  const response = await axios.get(`/CountryInfo/${countryCode}`);
  return response.data;
}

async function mounted() {
  await this.fetchCountryInfo();
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
    </div>
  </div>
</template>
