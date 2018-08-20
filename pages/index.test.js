import { shallowMount, mount, config } from '@vue/test-utils'
import Index from '@/pages/index'
import TitleBar from '@/components/TitleBar/TitleBar'
import ScrollingText from '@/components/ScrollingText/ScrollingText'
import Card from '@/components/Card/Card'

config.logModifiedComponents = false

describe('Index', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Index)
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should be a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should render a div', () => {
    expect(wrapper.contains('div')).toBeTruthy()
  })

  it('should render row div inside root div', () => {
    expect(wrapper.find('div').contains('.row')).toBeTruthy()
  })
})

describe('mounted Index', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Index)
  })

  it('should render titlebar component inside root div', () => {
    expect(wrapper
      .find('div')
      .contains(TitleBar))
      .toBeTruthy()
  })

  it('should render scrolling-text component inside root div', () => {
    expect(wrapper
      .find('div')
      .contains(ScrollingText))
      .toBeTruthy()
  })

  it('should render 4 card components inside row div', () => {
    expect(wrapper
      .find('.row')
      .findAll(Card))
      .toHaveLength(4)
  })

  it('should render card components correctly', () => {
    const cards = wrapper.findAll(Card).wrappers
    cards.forEach((card) => {
      expect(card.contains('.card-header')).toBeTruthy()
      expect(card.contains('.card-body')).toBeTruthy()
    })
  })
})
