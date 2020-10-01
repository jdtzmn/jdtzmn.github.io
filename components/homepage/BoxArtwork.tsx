import { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import debounce from 'debounce'
import BoxAnimator from 'src/BoxAnimator'

const Canvas = styled.canvas`
  display: block;
  margin: 0 auto;
`

interface BoxArtworkProps {
  animationDelay?: number // ms
}

export default function BoxArtwork({ animationDelay = 0 }: BoxArtworkProps) {
  const canvasElement = useRef<HTMLCanvasElement>(null)

  const [width, setWidth] = useState(264)
  const [height, setHeight] = useState(400)

  useEffect(() => {
    const context = canvasElement.current.getContext('2d')

    if (context === null) {
      return console.error("Context can't be null")
    }

    // start the animation
    const animator = new BoxAnimator(context, 7600)
    setupAnimations(animator)
    setTimeout(() => animator.start(), animationDelay)

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
      const [width, height] = animator.calculate2DBoundingBox(3, 5)
      setWidth(width)
      setHeight(height)
    }

    // pause the animation on window resize
    function onResize() {
      animator.pause()

      onResizeEnd()
    }

    // debounce until resize ends, then start the animation again
    const onResizeEnd = debounce(() => {
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
  animator.addBoxAt(0, 0, 0)
    .animateTo(0, 0, 0).at(800)
    .animateTo(0, 1, 0).at(1200)
    .animateTo(0, 1, 0).at(3200)
    .animateTo(1, 1, 0).at(3600)
    .animateTo(1, 2, 0).at(4000)
    .animateTo(1, 2, 0).at(4800)
    .animateTo(1, 2, 1).at(5200)
    .animateTo(0, 2, 1).at(5600)
    .animateTo(0, 2, 1).at(6400)
    .animateTo(0, 0, 1).at(7200);

  // prettier-ignore
  animator.addBoxAt(0, 0, 1)
    .animateTo(0, 0, 1).at(1200)
    .animateTo(0, 0, 0).at(1600);

  // prettier-ignore
  animator.addBoxAt(0, 0, -1)
    .animateTo(0, 0, -1).at(3200)
    .animateTo(0, -1, -1).at(3600)
    .animateTo(0, -2, -1).at(4000)
    .animateTo(0, -2, -1).at(4800)
    .animateTo(-1, -2, -1).at(5200)
    .animateTo(-1, -2, -1).at(6400)
    .animateTo(-1, 0, -1).at(7200);

  // prettier-ignore
  animator.addBoxAt(1, 0, 0)
    .animateTo(1, 0, 0).at(800)  
    .animateTo(1, -2, 0).at(1600)
    .animateTo(1, -2, 0).at(3200)
    .animateTo(-1, -2, 0).at(4000)
    .animateTo(-1, -2, 0).at(4800)
    .animateTo(-1, -2, 1).at(5200)
    .animateTo(-1, -2, 1).at(6400)
    .animateTo(-1, 0, 1).at(7200);

  // prettier-ignore
  animator.addBoxAt(1, 0, 1)
    .animateTo(1, 0, 1).at(800)  
    .animateTo(1, -2, 1).at(1600)
    .animateTo(1, -2, 1).at(3600)
    .animateTo(0, -2, 1).at(4000)
    .animateTo(0, -2, 1).at(4800)
    .animateTo(1, -2, 1).at(5200)
    .animateTo(1, -2, 1).at(6400)
    .animateTo(1, 0, 1).at(7200);

  // prettier-ignore
  animator.addBoxAt(1, 0, -1)
    .animateTo(1, 0, -1).at(800)
    .animateTo(1, -2, -1).at(1600)
    .animateTo(1, -2, -1).at(3600)
    .animateTo(1, -2, 0).at(4000)
    .animateTo(1, -2, 0).at(4800)
    .animateTo(1, -2, -1).at(5200)
    .animateTo(1, -2, -1).at(6400)
    .animateTo(1, 0, -1).at(7200);

  // prettier-ignore
  animator.addBoxAt(-1, 0, 0)
    .animateTo(-1, 0, 0).at(400)
    .animateTo(-1, 1, 0).at(800)
    .animateTo(-1, 2, 0).at(1200)
    .animateTo(0, 2, 0).at(1600)
    .animateTo(0, 2, 0).at(3200)
    .animateTo(-1, 2, 0).at(3600)
    .animateTo(-1, 2, 0).at(4800)
    .animateTo(-1, 2, -1).at(5200)
    .animateTo(0, 2, -1).at(5600)
    .animateTo(0, 2, -1).at(6400)
    .animateTo(0, 0, -1).at(7200);

  // prettier-ignore
  animator.addBoxAt(-1, 0, 1)
    .animateTo(-1, 0, 1).at(400)
    .animateTo(-1, 1, 1).at(800)
    .animateTo(0, 1, 1).at(1200)
    .animateTo(0, 2, 1).at(1600)
    .animateTo(0, 2, 1).at(4800)
    .animateTo(-1, 2, 1).at(5200)
    .animateTo(-1, 2, 0).at(5600)
    .animateTo(-1, 2, 0).at(6400)
    .animateTo(-1, 0, 0).at(7200);

  // prettier-ignore
  animator.addBoxAt(-1, 0, -1)
    .animateTo(-1, 0, -1).at(400)
    .animateTo(-1, 1, -1).at(800)
    .animateTo(0, 1, -1).at(1200)
    .animateTo(0, 2, -1).at(1600)
    .animateTo(0, 2, -1).at(4800)
    .animateTo(1, 2, -1).at(5200)
    .animateTo(1, 2, 0).at(5600)
    .animateTo(1, 2, 0).at(6400)
    .animateTo(1, 0, 0).at(7200);
}
