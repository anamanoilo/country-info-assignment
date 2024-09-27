<script setup lang="ts">
import { PropType } from 'vue';

  
interface Country {
  name: string;
  countryCode: string;
}


const props = defineProps({
  filteredCountries: {
    type: Array as PropType<Country[]>,
    required: true
  }
});
const { filteredCountries } = props;


</script>

<template>
  <div >
  <h3>Countries List</h3>
  <ul v-if="filteredCountries.length" class="mt-4">
     <li
          v-for="country in filteredCountries"
          :key="country.countryCode"
          class="cursor-pointer hover:underline"
        >
          {{ country.name }}
        </li>
  </ul>
</div>
</template>