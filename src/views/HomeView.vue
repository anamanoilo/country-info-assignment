<script lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld,
  },
  methods: {
    goToCountryHU() {
      this.$router.push('/country/hu');
    },
  },
});
</script>

<template>
  <HelloWorld msg="This is home" />

  <h2>HomeView</h2>
  <button @click="goToCountryHU">Go to Countries</button>
</template>
