<template lang="pug">
  div
    .title
      h1.text-heading.text-center Jacob Daitzman
      sub.text-heading.text-center jdtzmn@gmail.com
    .row
      card
        .card-header Skills
        .card-body Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      card
        .card-header Experience
        .card-body Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      card
        .card-header Projects
        .card-body Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      card
        .card-header Education
        .card-body Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</template>

<script lang="ts">
import Card from '@/components/Card/Card.vue'

import Vue from 'vue'
export default Vue.extend({
  components: { Card }
})
</script>

<style lang="scss">
@import '~@/styles/global';

.title {
  // display
  padding: 1em 0;

  // border
  border-bottom: 2px solid $lightgray;

  h1 {
    // font
    font-size: 2.3em;
  }
}
</style>
