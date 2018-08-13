<template lang="pug">
  div.row
    h1.text-heading.text-center Header
    p.text-body Body
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
})
</script>

<style>

/* ===== GRID ===== */

.row {
  /* display */
  max-width: 60em;
  margin: 0 auto;
}

/* ===== FONT ===== */

.text-heading {
  /* font */
  font-family: 'Lora', serif;
}

.text-body {
  /* font */
  font-family: 'Open Sans', serif;
  font-size: 1.2em;
  line-height: 1.5;
}

.text-center {
  /* font */
  text-align: center;
}
</style>
