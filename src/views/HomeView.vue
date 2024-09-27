<script setup lang="ts">
import CountryList from '../components/CountryList.vue';
import SearchInput from '../components/SearchInput.vue';
import RandomCountryWidget from '../components/RandomCountryWidget.vue';


// const countries = [{
// "countryCode": "AD",
// "name": "Andorra"
// },
// {
// "countryCode": "AL",
// "name": "Albania"
// },
// {
// "countryCode": "AM",
// "name": "Armenia"
// },
// {
// "countryCode": "AR",
// "name": "Argentina"
// },
// {
// "countryCode": "AT",
// "name": "Austria"
// },
// {
// "countryCode": "AU",
// "name": "Australia"
// },
// {
// "countryCode": "AX",
// "name": "Åland Islands"
// },
// {
// "countryCode": "BA",
// "name": "Bosnia and Herzegovina"
// },
// {
// "countryCode": "BB",
// "name": "Barbados"
// }]
// export default {
//   methods: {
//     goToAbout() {
//       this.$router.push('/country')
//     },
//   },
// }



</script>

<template>
    <div class="container px-4 mx-auto border-2 border-red-500">
      <h2>HomeView</h2>
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 ">
        <div class="lg:col-span-2 lg:order-1 order-2 border-2 border-orange-500">
          <SearchInput/>
          <CountryList/>
        </div>
        <div class="lg:col-span-3 lg:order-2 order-1 border-2 border-green-500">
          <RandomCountryWidget/>
        </div>
        
      </div>
      
      
    </div>
  
  <!-- <button @click="goToAbout">Go to About</button> -->
</template>