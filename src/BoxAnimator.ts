import { setLightness } from 'polished'
import { theme } from 'pages/_app'

class Config {
  static readonly leftColor = theme.colors.primary
  static readonly rightColor = theme.colors.secondary
  static readonly topColor = theme.colors.white
  static readonly borderColor = setLightness(0.85, theme.colors.gray)
  static readonly hertz = 60
}

class BoxRenderer {
  private _length = 50

  get length() {
    return this._length
  }

  set length(val: number) {
    this._length = val
  }

  constructor(private readonly ctx: CanvasRenderingContext2D) {}

  paintBoxAt(x: number, y: number, z: number) {
    const { ctx, _length: length, sin, cos } = this
    const { width, height } = ctx.canvas

    const coord = [width / 2, height / 2]

    // x
    coord[0] += x * length * cos(210)
    coord[1] -= x * length * sin(210)

    // y
    coord[1] -= y * length

    // z
    coord[0] += z * length * cos(-30)
    coord[1] -= z * length * sin(-30)

    this.paintBoxAt2D(coord[0], coord[1])
  }

  paintBoxAt2D(cx: number, cy: number) {
    const { ctx, _length: length, sin, cos } = this
    let x = cx
    let y = cy

    function lineInDirection(angle: number) {
      x += length * cos(angle)
      y -= length * sin(angle)
      ctx.lineTo(x, y)
    }

    // left
    ctx.beginPath()
    ctx.moveTo(x, y)
    lineInDirection(270)
    lineInDirection(150)
    lineInDirection(90)
    ctx.closePath()

    ctx.fillStyle = Config.leftColor
    ctx.fill()

    // right
    x = cx
    y = cy
    ctx.beginPath()
    ctx.moveTo(x, y)
    lineInDirection(30)
    lineInDirection(270)
    lineInDirection(210)

    ctx.fillStyle = Config.rightColor
    ctx.fill()

    // top
    x = cx + length * cos(150)
    y = cy - length * sin(150)
    ctx.beginPath()
    ctx.moveTo(x, y)
    lineInDirection(30)
    lineInDirection(-30)
    lineInDirection(210)

    ctx.fillStyle = Config.topColor
    ctx.fill()

    // borders
    ctx.strokeStyle = Config.borderColor
    ctx.stroke()
  }

  clear() {
    const { ctx } = this
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  calculate2DBoundingBox(horizontalBlocks: number, verticalBlocks: number) {
    const blockHeight = 2 * this.length
    const blockWidth = 2 * this.length * this.cos(30)

    return [horizontalBlocks * blockHeight, verticalBlocks * blockWidth]
  }

  private sin(angle: number) {
    const radians = angle * (Math.PI / 180)
    return Math.sin(radians)
  }

  private cos(angle: number) {
    const radians = angle * (Math.PI / 180)
    return Math.cos(radians)
  }
}

interface BoxStep {
  x: number
  y: number
  z: number
  time: number
}

type Vector3 = [x: number, y: number, z: number]

class Box {
  private readonly _steps: BoxStep[] = []
  get steps() {
    return this._steps
  }

  constructor(private readonly duration: number) {}

  animateTo(x: number, y: number, z: number) {
    return {
      at: (ms: number) => {
        if (ms > this.duration) {
          throw new Error(
            'Cannot animate at a time after the animation duration.'
          )
        }

        const previousBoxStep = this._steps[this._steps.length - 1]
        if (previousBoxStep && ms <= previousBoxStep.time) {
          throw new Error(
            'Animation steps must increase in time with each step.'
          )
        }

        const boxStep: BoxStep = {
          x,
          y,
          z,
          time: ms,
        }
        this._steps.push(boxStep)

        return this
      },
    }
  }

  getPositionAt(time: number): [x: number, y: number, z: number] {
    const binarySearch = (low: number, high: number): number => {
      if (low === high) {
        return high
      }

      const mid = Math.floor((high + low) / 2)
      const midStep = this.steps[mid]

      if (midStep.time > time) {
        // choose lower half
        return binarySearch(low, mid)
      } else if (midStep.time === time) {
        return mid
      } else {
        // check if it's within the range of the next step
        const nextStep = this.steps[mid + 1]
        if (!nextStep || nextStep.time > time) {
          return mid
        }

        // otherwise choose upper half
        return binarySearch(mid + 1, high)
      }
    }

    const currentStepIndex = binarySearch(0, this.steps.length - 1)
    const currentStep = this.steps[currentStepIndex]
    const nextStep = this.steps[currentStepIndex + 1]
    let { x, y, z } = currentStep

    if (nextStep) {
      const timePosition = time - currentStep.time
      const interval = nextStep.time - currentStep.time
      const percent = timePosition / interval

      x += percent * (nextStep.x - currentStep.x)
      y += percent * (nextStep.y - currentStep.y)
      z += percent * (nextStep.z - currentStep.z)
    }

    return [x, y, z] as Vector3
  }
}

export default class BoxAnimator {
  private readonly renderer: BoxRenderer
  private readonly boxes: Box[] = []
  private animating = false
  private startTime: number
  private progress: number // when paused, the progress in ms into the current cycle

  get length() {
    return this.renderer.length
  }

  set length(val: number) {
    this.renderer.length = val
  }

  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    public readonly duration: number
  ) {
    this.renderer = new BoxRenderer(ctx)
  }

  addBoxAt(x: number, y: number, z: number) {
    const box = new Box(this.duration)
    box.animateTo(x, y, z).at(0)
    this.boxes.push(box)

    return box
  }

  calculate2DBoundingBox(horizontalBlocks: number, verticalBlocks: number) {
    return this.renderer.calculate2DBoundingBox(
      horizontalBlocks,
      verticalBlocks
    )
  }

  private sortByHierarchy(a: Vector3, b: Vector3): number {
    return a[0] + a[1] + a[2] - (b[0] + b[1] + b[2])
  }

  private animate(timestamp: number) {
    const { animating, renderer, startTime, duration, boxes } = this
    if (!animating) return

    renderer.clear()
    const msOfAnimation = (timestamp - startTime) % duration

    const positions: Vector3[] = []

    for (const box of boxes) {
      const position = box.getPositionAt(msOfAnimation)
      positions.push(position)
    }

    for (const position of positions.sort(this.sortByHierarchy)) {
      renderer.paintBoxAt(...position)
    }

    setTimeout(() => {
      window.requestAnimationFrame(this.animate.bind(this))
    }, 1000 / Config.hertz)
  }

  start() {
    if (!this.animating) {
      this.animating = true
      if (!this.startTime) {
        this.startTime = performance.now()
      } else if (this.progress) {
        this.startTime = performance.now() - this.progress
        this.progress = undefined
      }
      window.requestAnimationFrame(this.animate.bind(this))
    }
  }

  stop() {
    this.animating = false
    this.renderer.clear()
  }

  pause() {
    if (this.animating) {
      this.animating = false
      this.progress = performance.now() - this.startTime
    }
  }
}
