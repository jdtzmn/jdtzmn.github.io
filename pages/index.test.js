import { shallowMount, mount, config } from '@vue/test-utils'
import Index from '@/pages/index'
import Card from '@/components/Card/Card'

config.logModifiedComponents = false

describe('Index', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Index, {
      stubs: {
        card: '<div class="card"></div>'
      }
    })
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

  it('should render title and row divs inside root div', () => {
    const rootDiv = wrapper.find('div')
    expect(rootDiv.contains('.title')).toBeTruthy()
    expect(rootDiv.contains('.row')).toBeTruthy()
  })

  it('should render h1 element inside title div', () => {
    expect(wrapper
      .find('.title')
      .contains('h1.text-heading.text-center'))
      .toBeTruthy()
  })

  it('should render "Jacob Daitzman" inside h1 element', () => {
    expect(wrapper
      .find('.title')
      .find('h1')
      .text())
      .toEqual('Jacob Daitzman')
  })
})

describe('mounted Index', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Index)
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
