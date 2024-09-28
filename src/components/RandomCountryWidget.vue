<script setup lang="ts">

const { randomCountries } = defineProps(['randomCountries']);

</script>

<template>
  <div>
    <h4>Random Country Widget</h4>
    <ul class="grid gap-2">
      <li
        v-for="country in randomCountries"
        :key="country.countryCode"
        class="p-2 border-2 border-gray-400"
      >
        <RouterLink :to="`/country/${country.countryCode.toLowerCase()}`" class="hover:underline"
          ><p>Name: {{ country.name }}</p
          ><p>Next Holiday: {{ country.holidayName }}</p
          ><p>Date: {{ country.holidayDate }}</p
          ></RouterLink
        >
      </li>
    </ul>
  </div>
</template>
