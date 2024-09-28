<script setup lang="ts">
import router from '../router';

const { randomCountries } = defineProps(['randomCountries']);

// Navigate to country page
    function navigateToCountry (countryCode: string)  {
      router.push({ name: 'country', params: { countryCode: countryCode.toLowerCase() } });
};
    
</script>

<template>
  <div>
    <h4>Random Country Widget</h4>
    <ul>
      <li
        v-for="country in randomCountries"
        :key="country.countryCode"
        class="p-3 cursor-pointer hover:underline"
      >
        <a @click="navigateToCountry(country.countryCode)"
          ><p>Name: {{ country.name }}</p
          ><p>Next Holiday: {{ country.holidayName }}</p
          ><p>Date: {{ country.holidayDate }}</p
          ></a
        >
      </li>
    </ul>
  </div>
</template>
