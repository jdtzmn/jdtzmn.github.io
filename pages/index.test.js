import { shallowMount } from '@vue/test-utils'
import Index from '../pages/index'

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

  it('should render a row div', () => {
    expect(wrapper.contains('div.row')).toBeTruthy()
  })

  it('should render h1 element', () => {
    expect(wrapper.contains('h1.text-heading.text-center')).toBeTruthy()
  })

  it('should render "Header" inside h1 element', () => {
    expect(wrapper.find('h1').text()).toEqual('Header')
  })

  it('should render p element', () => {
    expect(wrapper.contains('p.text-body')).toBeTruthy()
  })

  it('should render "Body" inside p element', () => {
    expect(wrapper.find('p').text()).toEqual('Body')
  })
})
