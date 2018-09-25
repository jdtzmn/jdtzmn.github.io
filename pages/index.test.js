import { shallowMount, mount, config } from '@vue/test-utils'
import Index from '@/pages/index'
import TitleBar from '@/components/TitleBar/TitleBar'
import Card from '@/components/Card/Card'
import Segment from '@/components/Segment/Segment'

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

  it('should render aboutme div inside root div', () => {
    expect(wrapper
      .find('div')
      .contains('.aboutme'))
      .toBeTruthy()
  })

  it('should render row div inside aboutme div', () => {
    expect(wrapper
      .find('.aboutme')
      .contains('.row.no-flex'))
      .toBeTruthy()
  })

  it('should render row div inside aboutme div', () => {
    expect(wrapper
      .find('.aboutme')
      .contains('.row'))
      .toBeTruthy()
  })

  it('should render cards div inside root div', () => {
    expect(wrapper
      .find('div')
      .contains('.cards'))
      .toBeTruthy()
  })

  it('should render 3 project card components inside cards div', () => {
    expect(wrapper
      .find('.project-cards')
      .findAll(Card))
      .toHaveLength(3)
  })

  it('should render 3 info card components inside cards div', () => {
    expect(wrapper
      .find('.cards')
      .findAll(Card))
      .toHaveLength(3)
  })

  it('should render card components correctly', () => {
    const cards = wrapper.findAll(Card).wrappers
    cards.forEach((card) => {
      expect(card.contains('.card-header')).toBeTruthy()
      expect(card.contains('.card-body')).toBeTruthy()
    })
  })

  it('should render row div inside root div', () => {
    expect(wrapper.find('div').contains('.row')).toBeTruthy()
  })

  it('should render experiences card-body div', () => {
    expect(wrapper.contains('.card-body.experiences')).toBeTruthy()
  })

  it('should render 5 experience divs inside experiences div', () => {
    expect(wrapper.findAll('.experience')).toHaveLength(5)
  })

  it('every experience div should contain 2 child divs', () => {
    const experiences = wrapper.findAll('.experience').wrappers
    experiences.forEach((experience) => {
      expect(experience.findAll('div').wrappers).toHaveLength(3) // the .experience div and 2 children
    })
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

  it('should render 3 segment components inside root div', () => {
    expect(wrapper
      .find('div')
      .contains(Segment))
      .toBeTruthy()
  })
})
