import { shallowMount } from '@vue/test-utils'
import Footer from './Footer'

describe('Footer', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Footer)
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render footer div', () => {
    expect(wrapper.contains('.footer')).toBeTruthy()
  })

  it('should render footer-content div', () => {
    expect(wrapper
      .find('.footer')
      .contains('.footer-content'))
      .toBeTruthy()
  })

  it('should render 2 footer-section divs inside footer-content div', () => {
    expect(wrapper
      .find('.footer-content')
      .findAll('.footer-section'))
      .toHaveLength(2)
  })

  it('should render every footer-section with a footer-header div', () => {
    const sections = wrapper.findAll('.footer-section')
    expect(sections.contains('.footer-header')).toBeTruthy()
    expect(sections.contains('.footer-link')).toBeTruthy()
  })

  it('should render an a element inside every footer-link', () => {
    expect(wrapper.findAll('.footer-link').contains('a')).toBeTruthy()
  })

  it('should render copyright div', () => {
    expect(wrapper.contains('.copyright')).toBeTruthy()
  })
})
