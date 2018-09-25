import { shallowMount } from '@vue/test-utils'
import Segment from './Segment'

describe('Segment', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Segment, {
      slots: {
        default: '<div class="slot"></div>'
      }
    })
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render segment div', () => {
    expect(wrapper.contains('.segment')).toBeTruthy()
  })

  it('should render segment-content div inside segment div', () => {
    expect(wrapper
      .find('.segment')
      .contains('.segment-container'))
      .toBeTruthy()
  })

  it('slot should render inside segment div', () => {
    expect(wrapper
      .find('.segment')
      .find('.segment-container')
      .contains('.slot'))
      .toBeTruthy()
  })
})
