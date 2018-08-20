<template lang="pug">
  .scrolling-text
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.component('scrolling-text', {})
</script>

<style lang="scss" scoped>
@import '~@/styles/colors';

.scrolling-text {
  background: $lightgray;
  height: 300px;
}
</style>
