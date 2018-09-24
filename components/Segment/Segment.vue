<template lang="pug">
  .segment
    .segment-container
      slot
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.component('segment', {})
</script>

<style lang="scss" scoped>
@import '~@/styles/grid';
@import '~@/styles/breakpoints';
@import '~@/styles/font';

.segment-container {
  // display
  @extend %center-block;
  padding: 50px 25px;

  @include lg {
    padding-top: 75px;
    padding-bottom: 75px;
  }
}

.segment-container > .segment-header {
  @extend %header1;

  // display
  padding-bottom: 15px;

  // font
  font-size: 1.8em;
  font-weight: 500;
}

// =========== STYLES ===========

// slanted
.segment.slanted {
  // transform
  transform: skewY(2deg);

  & > .segment-container {
    // transform
    transform: skewY(-2deg);
  }
}

</style>
