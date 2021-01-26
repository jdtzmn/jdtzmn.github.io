import { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import debounce from 'debounce'
import BoxAnimator from 'src/BoxAnimator'

const Canvas = styled.canvas`
  display: block;
  margin: 0 auto;
`

export default function Loading() {
  const canvasElement = useRef<HTMLCanvasElement>(null)

  const [width, setWidth] = useState(264)
  const [height, setHeight] = useState(400)

  useEffect(() => {
    const context = canvasElement.current.getContext('2d')

    if (context === null) {
      return console.error("Context can't be null")
    }

    // start the animation
    const animator = new BoxAnimator(context, 1000)
    setupAnimations(animator)
    animator.start()

    // adjust the box edge width based on the window width
    function responsiveEdgeLength() {
      const range = [32, 40]
      const screenWidthRange = [480, 1920]
      const slope =
        (range[1] - range[0]) / (screenWidthRange[1] - screenWidthRange[0])
      const unboundedLinear =
        slope * (window.innerWidth - screenWidthRange[0]) + range[0]
      animator.length = Math.min(Math.max(unboundedLinear, range[0]), range[1])
    }

    // adjust the canvas size based on the edge length
    function responsiveCanvasDimensions() {
      const [width, height] = animator.calculate2DBoundingBox(2, 3)
      setWidth(width)
      setHeight(height)
    }

    // pause the animation on window resize
    let lastWidth = null
    function onResize() {
      if (lastWidth === null) {
        lastWidth = window.innerWidth
      }

      /**
       * only pause the animation if a change in width is detected
       * - this was an issue on iOS where the responsive menu bar inadvertently resizes the page
       */
      if (lastWidth !== window.innerWidth) {
        animator.pause()
      }

      onResizeEnd()
    }

    // debounce until resize ends, then start the animation again
    const onResizeEnd = debounce(() => {
      lastWidth = null

      // adjust edge length
      responsiveEdgeLength()

      // adjust canvas size
      responsiveCanvasDimensions()

      // resume the animation
      animator.start()
    }, 200)

    // listen for window size changes and run initial setup
    window.addEventListener('resize', onResize)
    responsiveEdgeLength()
    responsiveCanvasDimensions()

    // cleanup
    return () => {
      window.removeEventListener('resize', onResize)
      animator.stop()
    }
  }, [])

  return <Canvas width={width} height={height} ref={canvasElement} />
}

// hard-code the box animations in 3D
function setupAnimations(animator: BoxAnimator) {
  // prettier-ignore
  animator.addBoxAt(1, 0.5, 0)
    .animateTo(0, 0.5, 0).at(500)
    .animateTo(0, 0.5, 1).at(1000);

  // prettier-ignore
  animator.addBoxAt(0, 0.5, 1)
    .animateTo(1, 0.5, 1).at(500)
    .animateTo(1, 0.5, 0).at(1000);
}
