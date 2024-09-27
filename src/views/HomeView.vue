<script setup lang="ts">
import { ref, computed } from 'vue';
import CountryList from '../components/CountryList.vue';
import SearchInput from '../components/SearchInput.vue';
import RandomCountryWidget from '../components/RandomCountryWidget.vue';


const countries = ref([{
"countryCode": "AD",
"name": "Andorra"
},
{
"countryCode": "AL",
"name": "Albania"
},
{
"countryCode": "AM",
"name": "Armenia"
},
{
"countryCode": "AR",
"name": "Argentina"
},
{
"countryCode": "AT",
"name": "Austria"
},
{
"countryCode": "AU",
"name": "Australia"
}]) 


const searchQuery = ref('');

// Filter countries based on search query
const filteredCountries = computed(() =>
  countries.value.filter(country =>
    country.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

</script>

<template>
    <div class="container px-4 mx-auto border-2 border-red-500">
      <h2>HomeView</h2>
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 ">
        <div class="lg:col-span-2 lg:order-1 order-2 border-2 border-orange-500">
          <SearchInput v-model="searchQuery" />
          <CountryList :filteredCountries="filteredCountries" />
        </div>
        <div class="lg:col-span-3 lg:order-2 order-1 border-2 border-green-500">
          <RandomCountryWidget/>
        </div>
        
      </div>
      
      
    </div>
  
  <!-- <button @click="goToAbout">Go to About</button> -->
</template>