import {
  Children,
  isValidElement,
  cloneElement,
  PropsWithChildren,
  useEffect,
  useRef,
  SyntheticEvent,
  MutableRefObject,
  Ref,
} from 'react'
import styled from 'styled-components'
import { invert } from 'polished'
import Fade from 'react-reveal/Fade'
import { RiArrowUpLine, RiArrowDownLine } from 'react-icons/ri'
import { FieldError } from 'react-hook-form'
import { Heading, Button } from 'components/styled'
import { BlockContext } from './Form'

interface BlockContainerProps {
  selected?: boolean
}

const BlockContainer = styled.div<BlockContainerProps>`
  margin-bottom: 4em;
  opacity: 0.3;
  transition: opacity ${({ theme }) => theme.animationDuration};
  ${({ selected }) => selected && 'opacity: 1;'}
`

const FormHeading = styled(Heading)`
  font-size: 1.5em;
`

const RequiredAsterisk = styled.span`
  color: ${({ theme }) => theme.colors.danger};
`

const HelpText = styled.p`
  font-size: 0.9em;
`

const ErrorText = styled.p`
  font-size: 0.9em;
  color: ${({ theme }) => theme.colors.danger};
`

const BackButton = styled(Button)`
  color: ${({ theme }) => theme.colors.headers};
  box-shadow: none;
  border: 0;
  padding: 16px;
  margin-top: 32px;

  &:hover {
    box-shadow: none;
    transform: translateY(-5px);
  }
`

const NextButton = styled(Button)`
  background: ${({ theme }) => theme.colors.headers};
  color: ${({ theme }) => invert(theme.colors.headers)};
  box-shadow: none;
  border: 0;
  padding: 16px;
  margin-top: 32px;
`

// shortcuts

export function enterShortcut(event: KeyboardEvent): boolean {
  return event.key === 'Enter'
}

export function enterWithoutShiftShortcut(event: KeyboardEvent): boolean {
  return enterShortcut(event) && !event.shiftKey
}

export function commandEnterShortcut(event: KeyboardEvent): boolean {
  return event.key === 'Enter' && event.metaKey
}

// prop wrappers

function mergeRefs<T>(existingRef: Ref<T>, elementRef: MutableRefObject<T>) {
  return (e: T) => {
    elementRef.current = e
    if (!existingRef) return

    if (typeof existingRef === 'function') {
      existingRef(e)
    } else if ('current' in existingRef) {
      ;(existingRef as MutableRefObject<T>).current = e
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
type EventFunction<T> = (event: T) => boolean | void

export function wrapEventWith<T = SyntheticEvent>(
  eventFunction: EventFunction<T> | undefined,
  wrapper: EventFunction<T>
) {
  return (event: T) => {
    const wrapperReturnValue = wrapper(event)
    if (typeof wrapperReturnValue === 'boolean' && !wrapperReturnValue)
      return false

    if (typeof eventFunction !== 'undefined') {
      return eventFunction(event)
    }
  }
}

interface BlockProps {
  prompt?: string
  required?: boolean
  helpText?: string
  error?: FieldError | string
  nextShortcut?: (event: KeyboardEvent) => boolean // determine whether to move to next block defaults to 'Enter'

  blockContext?: BlockContext
}

export default function Block(props: PropsWithChildren<BlockProps>) {
  const blockRef = useRef(null)
  const elementRef = useRef(null)

  // determine if the next shortcut was pressed. 'Enter' by default
  const isNextShortcut = props.nextShortcut || enterWithoutShiftShortcut

  // event handlers
  function handleBlockClick() {
    if (props.blockContext?.selectBlock && !props.blockContext?.selected)
      props.blockContext?.selectBlock()
  }

  function handleFocus() {
    if (props.blockContext?.selectBlock && !props.blockContext?.selected)
      props.blockContext?.selectBlock()
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (isNextShortcut(event)) handleNextClick()

    // don't submit until the last block (using 'Enter')
    if (
      enterShortcut(event) &&
      // not should submit or it is a textarea and it should not submit
      !props.blockContext?.shouldSubmit &&
      // eslint-disable-next-line @typescript-eslint/dot-notation
      event.target['nodeName'] !== 'TEXTAREA'
    ) {
      event.preventDefault()
      return false
    }
  }

  function handleBackClick() {
    if (props.blockContext?.selectBlock && !props.blockContext?.isFirst)
      props.blockContext?.selectBlock(-1)
  }

  function handleNextClick() {
    if (props.blockContext?.selectBlock && !props.blockContext?.isLast)
      props.blockContext?.selectBlock(1)
  }

  // focus and scroll into view on select
  useEffect(() => {
    if (props.blockContext?.selected) {
      if (elementRef.current?.focus) {
        elementRef.current.focus()
        blockRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    }
  }, [props.blockContext?.selected])

  // add props to child if only one
  let children = props.children
  try {
    const child = Children.only(children)
    if (isValidElement(child)) {
      const additionalProps = {
        ref: mergeRefs('ref' in child ? (child as any).ref : null, elementRef),
        onFocus: wrapEventWith(child.props.onFocus, handleFocus),
        onKeyDown: wrapEventWith(child.props.onKeyDown, handleKeyDown),
      }
      children = cloneElement(child, additionalProps)
    }
  } catch {
    // there is more than one element
  }

  // conditionally render a required asterisk
  const requiredAsterisk = props.required ? (
    <RequiredAsterisk> *</RequiredAsterisk>
  ) : null

  // use react form errors or else use the error text itself
  const errorMessage =
    (typeof props.error === 'object' && props.error?.message) || props.error

  return (
    <BlockContainer
      selected={props.blockContext?.selected}
      onClick={handleBlockClick}
      ref={blockRef}
    >
      {/* back button */}
      {!props.blockContext?.isFirst && (
        <Fade
          when={props.blockContext?.selected}
          duration={300}
          distance="16px"
          bottom
        >
          <BackButton type="button" tabIndex={-1} onClick={handleBackClick}>
            <RiArrowUpLine
              style={{ verticalAlign: 'middle', paddingRight: '0.5em' }}
            />
            Back
          </BackButton>
        </Fade>
      )}

      {/* main block content */}
      {props.prompt && (
        <FormHeading>
          {props.prompt}
          {requiredAsterisk}
        </FormHeading>
      )}
      {children}
      {props.helpText && <HelpText>{props.helpText}</HelpText>}
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

      {/* next button */}
      {!props.blockContext?.isLast && (
        <Fade
          when={props.blockContext?.selected}
          duration={300}
          distance="16px"
          bottom
        >
          <NextButton type="button" tabIndex={-1} onClick={handleNextClick}>
            <RiArrowDownLine
              style={{ verticalAlign: 'middle', paddingRight: '0.5em' }}
            />
            Next
          </NextButton>
        </Fade>
      )}
    </BlockContainer>
  )
}
