<template lang="pug">
  .card(:class='{ raised: type === "raised" }')
    slot
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.component('card', {
  props: {
    type: {
      type: String,
      default: 'flat'
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~@/styles/colors';
@import '~@/styles/font';
@import '~@/styles/breakpoints.scss';

.card {
  // display
  padding-bottom: 20px;

  @include md {
    padding-bottom: 0;
  }

  &.raised {
    // color
    background: white;
    color: $blacktext;

    // display
    padding: 25px;
    margin-bottom: 25px;

    // border and shadow
    border-radius: 4px;
    box-shadow: 0 1px 4px $darkgray;

    @include md {
      border-radius: 2px;
    }
  }
}

.card > .card-header {
  @extend %header;

  // color
  color: $blacktext;

  // font
  font-size: 1.3em;
  font-weight: 500;
}
</style>
