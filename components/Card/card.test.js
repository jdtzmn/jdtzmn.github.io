import { shallowMount } from '@vue/test-utils'
import Card from './Card'

describe('Card', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Card, {
      slots: {
        default: '<div class="slot"></div>'
      }
    })
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render card div', () => {
    expect(wrapper.contains('.card')).toBeTruthy()
  })

  it('slot should render inside card div', () => {
    expect(wrapper
      .find('.card')
      .contains('.slot'))
      .toBeTruthy()
  })
})
