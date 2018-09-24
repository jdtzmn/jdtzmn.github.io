<template lang="pug">
  .footer
    .footer-content
      .footer-section(v-for='section in sections', :key='section.name')
        .footer-header {{ section.name }}
        .footer-link(v-for='link in section.links', :key='link.name')
          a(:href='link.href') {{ link.name }}
      .copyright © 2018 Jacob Daitzman. All rights reserved.
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.component('footer-links', {
  data () {
    return {
      sections: [
        {
          name: 'Browse',
          links: [
            { name: 'Home', href: '/' },
            { name: 'Projects', href: 'https://github.com/jdtzmn?tab=repositories' }
          ]
        },
        {
          name: 'Social',
          links: [
            { name: 'Website', href: '/' },
            { name: 'GitHub', href: 'https://github.com/jdtzmn' },
            { name: 'Codepen', href: 'https://codepen.io/jdtzmn' }
          ]
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~@/styles/colors';
@import '~@/styles/grid';

$background: darken($darkgray, 10%);

.footer {
  // display
  padding-top: 25px;

  // color
  background: linear-gradient($background, darken($background, 5%));
  color: $lightgray;
}

.footer-content {
  // display
  @extend %center-block;
}

.footer-section {
  // display
  margin: 30px 0;

  @include md {
    max-width: 50%;
  }
}

.footer-header {
  // display
  margin-bottom: 10px;

  // font
  font-size: 1.7em;
  font-weight: 500;

  // border
  border-bottom: 2px solid $lightgray;
}

.footer-link > a {
  // color
  color: $lightgray;

  // font
  text-decoration: none;

  // transition
  transition: color 0.1s;

  &:hover {
    // color
    color: $gray;
  }
}

.copyright {
  // color
  color: $lighttext;

  // display
  padding-bottom: 25px;

  // font
  font-size: 0.7em;
  text-align: center;
}
</style>
