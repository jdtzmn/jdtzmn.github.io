<template lang="pug">
  header
    .background(ref='background')
      //- hidden images that load higher-res images over time
      img.hidden(src='~@@/assets/img/title/computer@2x.jpg', @load='changeImages')
    .title(:style='titleStyle', data-cy='title')
      h1.h1.text-center.alternate-font(:style='headerStyle') Jacob Daitzman
      a(href='mailto:jdtzmn@gmail.com')
        sub.h1.text-center(:style='subStyle', data-cy='email') jdtzmn@gmail.com
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.component('titlebar', {
  data () {
    return {
      titleStyle: {},
      headerStyle: {},
      subStyle: {}
    }
  },
  mounted () {
    window.onscroll = this.handleChange
    window.onresize = this.handleChange
  },
  methods: {
    changeImages (e: Event) {
      const background = this.$refs.background as HTMLDivElement
      const image = e.target as HTMLImageElement
      const url = image.src
      background.style.backgroundImage = `url('${url}')`
    },
    calculateCurrent (config: any, currentY: number, endY: number) {
      const { initial, min } = config
      const slope = (initial - min) / endY
      const output = -slope * currentY + initial
      return Math.min(Math.max(output, min), initial)
    },
    handleChange () {
      const { scrollY, innerWidth } = window
      if (innerWidth < 768) {
        this.updateStyles(scrollY)
      } else {
        this.titleStyle = this.headerStyle = this.subStyle = {}
      }
    },
    updateStyles (scrollY: number) {
      const { innerWidth } = window
      const endY = 150
      const height = {
        initial: 91,
        min: 40
      }
      const padding = {
        initial: 20,
        min: 5
      }
      const scale = {
        initial: 1,
        min: innerWidth >= 576 ? 0.6 : 0.65
      }
      const opacity = {
        initial: 1,
        min: 0
      }
      const position = {
        initial: 0,
        min: -28
      }

      const { calculateCurrent } = this
      const computedHeight = calculateCurrent(height, scrollY, endY)
      const computedPadding = calculateCurrent(padding, scrollY, endY)
      const computedScale = calculateCurrent(scale, scrollY, endY)
      const computedOpacity = calculateCurrent(opacity, scrollY, endY)
      const computedPosition = calculateCurrent(position, scrollY, endY)
      const hideSub = scrollY >= endY
      this.titleStyle = {
        background: 'black',
        height: `${computedHeight}px`,
        padding: `${computedPadding}px 0`,
        position: 'fixed',
        zIndex: 1
      }
      this.headerStyle = {
        transform: `scale(${computedScale})`
      }
      this.subStyle = {
        opacity: computedOpacity,
        top: `${computedPosition}px`,
        display: hideSub ? 'none' : 'block'
      }
    }
  }
})
</script>

<style lang="scss" scoped>

@import '~@/styles/colors';

header {
  // color
  background: black;

  // display
  width: 100%;
}

.background {
  // color
  background: black;
  background-image: url('~/assets/img/title/computer.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  // display
  width: 100%;
  max-width: 1300px;
  min-height: 400px;
  height: 60vw;
  max-height: 600px;
  margin: 0 auto;
  padding-top: 20px;

  // other
  z-index: 1;
  overflow: hidden;
}

.title {
  // color
  color: $white;

  // display
  padding: 20px 0;

  // position
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  h1 {
  // font
  font-size: 2.3em;

  // transform
  transform-origin: top center;
  }

  a {
    text-decoration: none;
  }

  sub {
    // position
    position: relative;
  }
}

.hidden {
  // display
  display: none;
}

</style>
