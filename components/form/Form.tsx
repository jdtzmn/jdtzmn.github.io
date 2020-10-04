import {
  useState,
  Children,
  isValidElement,
  cloneElement,
  ComponentPropsWithoutRef,
} from 'react'
import styled from 'styled-components'
import Block from './Block'

const PaddedBottomForm = styled.form`
  padding-bottom: 8em;
`

export interface BlockContext {
  selected: boolean
  isFirst: boolean
  isLast: boolean
  shouldSubmit: boolean
  autoscrollFeatures: boolean
  selectBlock: (delta?: -1 | 0 | 1) => void
}

interface FormProps extends ComponentPropsWithoutRef<'form'> {
  disableAutoscroll?: boolean
}

export default function Form({
  children,
  disableAutoscroll,
  ...props
}: FormProps) {
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0)
  const lastIndex = Children.count(children) - 1

  function handleBlockSelection(blockIndex: number, delta?: -1 | 0 | 1) {
    if (typeof delta !== 'undefined' && ![-1, 0, 1].includes(delta)) {
      throw new Error(`Delta must be of value -1, 0, or 1. Received ${delta}`)
    }

    const nextIndex = blockIndex + (typeof delta === 'undefined' ? 0 : delta)
    if (nextIndex < 0 || nextIndex > lastIndex) {
      throw new Error('Children out of bounds exception')
    }

    setCurrentBlockIndex(nextIndex)
  }

  // render

  const childrenWithProps = Children.map(children, (child, index) => {
    const blockContext: BlockContext = {
      selected: currentBlockIndex === index,
      isFirst: index === 0,
      isLast: index === lastIndex,
      shouldSubmit: currentBlockIndex === lastIndex,
      autoscrollFeatures: !disableAutoscroll,
      selectBlock: (delta) => handleBlockSelection(index, delta),
    }

    const additionalProps = { blockContext }

    if (isValidElement(child) && child.type === Block) {
      return cloneElement(child, additionalProps)
    }
    return child
  })

  return <PaddedBottomForm {...props}>{childrenWithProps}</PaddedBottomForm>
}
