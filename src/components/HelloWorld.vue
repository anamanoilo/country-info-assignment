<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: ['inputText'],
  computed: {
    countTest(): number {
      return this.inputText.length;
    },
  },
});
</script>

<template>
  <h1>Hello World</h1>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
