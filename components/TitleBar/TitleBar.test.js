import { shallowMount, mount } from '@vue/test-utils'
import TitleBar from './TitleBar'

describe('TitleBar', () => {
  let wrapper
  let title
  beforeEach(() => {
    wrapper = shallowMount(TitleBar)
    title = wrapper.find('.title')
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render title div', () => {
    expect(wrapper.contains('.title')).toBeTruthy()
  })

  it('should render h1 element inside title div', () => {
    expect(title
      .contains('h1.text-heading.text-center'))
      .toBeTruthy()
  })

  it('should render "Jacob Daitzman" inside h1 element', () => {
    expect(title
      .find('h1')
      .text())
      .toBe('Jacob Daitzman')
  })

  it('should render sub element inside title div', () => {
    expect(title
      .contains('sub.text-heading.text-center'))
      .toBeTruthy()
  })

  it('should render "jdtzmn@gmail.com" inside sub element', () => {
    expect(title
      .find('sub')
      .text())
      .toBe('jdtzmn@gmail.com')
  })
})

describe('mounted TitleBar', () => {
  let wrapper
  let title
  beforeEach(() => {
    wrapper = mount(TitleBar)
    title = wrapper.find('.title')
  })

  const sampleStyle = { color: 'blue' }
  const sampleText = 'color: blue;'

  it('should render style prop based on titleStyle data', () => {
    wrapper.setData({ titleStyle: sampleStyle })
    expect(title.attributes().style).toBe(sampleText)
  })

  it('should render bottom class based on hasBottomBorder data', () => {
    wrapper.setData({ hasBottomBorder: true })
    expect(title.attributes().class).toBe('title border')
  })

  it('should render style prop based on headerStyle data', () => {
    wrapper.setData({ headerStyle: sampleStyle })
    expect(title.find('h1').attributes().style).toBe(sampleText)
  })

  it('should render style prop based on subStyle data', () => {
    wrapper.setData({ subStyle: sampleStyle })
    expect(title.find('sub').attributes().style).toBe(sampleText)
  })
})
