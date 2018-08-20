<template lang="pug">
  .card
    slot
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.component('card', {})
</script>

<style lang="scss" scoped>
@import '~@/styles/colors';
@import '~@/styles/font';

.card {
  // padding
  padding: 0.5em 0;
}

.card > .card-header {
  @extend %text-heading;

  // font
  font-size: 1.2em;

  // border
  border-bottom: 1px solid $lightgray;
}
</style>
