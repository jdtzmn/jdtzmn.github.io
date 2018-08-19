import { shallowMount, mount, config } from '@vue/test-utils'
import Index from '@/pages/index'
import EventList from '@/components/EventList/EventList'

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

  it('should render title and row divs inside root div', () => {
    const rootDiv = wrapper.find('div')
    expect(rootDiv.contains('div.title')).toBeTruthy()
    expect(rootDiv.contains('div.row')).toBeTruthy()
  })

  it('should render h1 element inside title div', () => {
    expect(wrapper
      .find('div.title')
      .contains('h1.text-heading.text-center'))
      .toBeTruthy()
  })

  it('should render "Jacob Daitzman" inside h1 element', () => {
    expect(wrapper
      .find('div.title')
      .find('h1')
      .text())
      .toEqual('Jacob Daitzman')
  })

  it('should render p element inside row div', () => {
    expect(wrapper
      .find('div.row')
      .contains('p.text-body'))
      .toBeTruthy()
  })

  it('should render "Body" inside p element', () => {
    expect(wrapper
      .find('p.text-body')
      .text())
      .toEqual('Body')
  })
})

describe('mounted Index', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Index)
  })

  it('should render event-list component inside row div', () => {
    expect(wrapper
      .find('div.row')
      .contains(EventList))
      .toBeTruthy()
  })
})
