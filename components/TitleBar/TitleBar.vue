<template lang="pug">
  .title(
    v-bind:style='titleStyle',
    v-bind:class='{ border: hasBottomBorder }'
    data-cy='title'
  )
    h1.text-heading.text-center(v-bind:style='headerStyle') Jacob Daitzman
    sub.text-heading.text-center(
      v-bind:style='subStyle'
      data-cy='email'
    ) jdtzmn@gmail.com
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.component('titlebar', {
  data () {
    return {
      titleStyle: {},
      headerStyle: {},
      subStyle: {},
      hasBottomBorder: false
    }
  },
  mounted () {
    window.onscroll = this.handleScroll
  },
  methods: {
    calculateCurrent (config: any, currentY: number, endY: number) {
      const { initial, min } = config
      const slope = (initial - min) / endY
      const output = -slope * currentY + initial
      return Math.min(Math.max(output, min), initial)
    },
    handleScroll () {
      const { scrollY } = window
      const endY = 150
      const height = {
        initial: 81,
        min: 30
      }
      const padding = {
        initial: 1,
        min: 0.2
      }
      const scale = {
        initial: 1,
        min: 0.6
      }
      const opacity = {
        initial: 1,
        min: 0
      }
      const position = {
        initial: 0,
        min: -28
      }
      const margin = {
        initial: 115,
        min: 50
      }

      const { calculateCurrent } = this
      const computedHeight = calculateCurrent(height, scrollY, endY)
      const computedPadding = calculateCurrent(padding, scrollY, endY)
      const computedScale = calculateCurrent(scale, scrollY, endY)
      const computedOpacity = calculateCurrent(opacity, scrollY, endY)
      const computedPosition = calculateCurrent(position, scrollY, endY)
      const computedMargin = calculateCurrent(margin, scrollY, endY)

      this.titleStyle = {
        height: `${computedHeight}px`,
        padding: `${computedPadding}em 0`
      }
      this.headerStyle = {
        transform: `scale(${computedScale})`
      }
      this.subStyle = {
        opacity: computedOpacity,
        top: `${computedPosition}px`
      }
      this.hasBottomBorder = scrollY > endY

      const rootDiv = document.querySelector('#__layout > div')
      if (rootDiv instanceof HTMLElement) {
        rootDiv.style.marginTop = `${computedMargin}px`
      }
    }
  }
})
</script>

<style lang="scss">

#__layout > div {
  margin-top: 115px;
}
</style>

<style lang="scss" scoped>

@import '~@/styles/colors';

.title {
  // color
  background: $white;

  // display
  width: 100%;
  padding: 1em 0;

  // position
  position: fixed;
  top: 0;

  // other
  z-index: 1;
  overflow: hidden;

  &.border {
    // border
    border-bottom: 2px solid $lightgray;
  }

  h1 {
    // font
    font-size: 2.3em;

    // transform
    transform-origin: top center;
  }

  sub {
    // position
    position: relative;
  }
}

</style>
