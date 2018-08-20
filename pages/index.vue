<template lang="pug">
  div
    titlebar
    scrolling-text
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
import TitleBar from '@/components/TitleBar/TitleBar.vue'
import ScrollingText from '@/components/ScrollingText/ScrollingText.vue'
import Card from '@/components/Card/Card.vue'

import Vue from 'vue'
export default Vue.extend({
  components: { TitleBar, ScrollingText, Card }
})
</script>

<style lang="scss">
@import '~@/styles/global';
</style>

<style scoped lang="scss">
@import '~@/styles/colors';

.page {
  margin-top: 115px;
}

.card-header {
  // color
  background: $white;

  // position
  position: sticky;
  top: 2em;
}
</style>
