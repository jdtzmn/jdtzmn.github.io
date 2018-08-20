import { shallowMount } from '@vue/test-utils'
import ScrollingText from './ScrollingText'

describe('ScrollingText', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(ScrollingText)
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render scrolling-text div', () => {
    expect(wrapper.contains('.scrolling-text')).toBeTruthy()
  })
})
