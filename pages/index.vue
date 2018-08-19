<template lang="pug">
  div
    div.title
      h1.text-heading.text-center Jacob Daitzman
      sub.text-heading.text-center jdtzmn@gmail.com
    div.row
      p.text-body Body
      event-list
</template>

<script lang="ts">
import EventList from '@/components/EventList/EventList.vue'

import Vue from 'vue'
export default Vue.extend({
  components: { EventList }
})
</script>

<style lang="scss">
@import '~@/styles/colors';
@import '~@/styles/font';
@import '~@/styles/grid';

.title {
  /* display */
  margin-top: 1em;
}
</style>
