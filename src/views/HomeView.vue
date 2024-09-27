<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {},
  methods: {
    goToCountryHU() {
      this.$router.push('/country/hu');
    },
  },
});
</script>

<template>
  <h2>HomeView</h2>
  <button @click="goToCountryHU">Go to Country HU</button>
</template>
