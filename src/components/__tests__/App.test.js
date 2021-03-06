/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import App from '../App'

const setup = propOverrides => {
  const props = Object.assign({
    title: 'Hello, tests'
  }, propOverrides)

  const wrapper = shallow(<App {...props} />)

  return {
    props,
    wrapper,
    title: wrapper.find('.title')
  }
}

it('renders correctly', () => {
  const { wrapper } = setup()
  expect(wrapper).toMatchSnapshot()
})

it('has the correct title', () => {
  const { title } = setup({ title: 'Test Title' })
  expect(title.text()).toEqual('Test Title')
})
