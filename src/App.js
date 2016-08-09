import React, { Component } from 'react'
import { Select, Option } from './components/Superlect'

const stateToStyle = ({ selected, focused }) => {
  if (selected) {
    return { backgroundColor: 'red' }
  } else if (focused && !selected) {
    return { backgroundColor: 'whitesmoke' }
  } else {
    return { backgroundColor: '' }
  }
}

const CustomLabel = ({ selected, focused, children }) => (
  <div style={stateToStyle({ selected, focused })}>
    {children}
  </div>
)

export default class extends Component {
  constructor () {
    super()
    this.state = {}
  }

  handleChange (select, value) {
    this.setState({
      [select]: value
    })
  }

  render () {
    return (
      <div>
        <label>Select with strings</label>
        <Select onChange={(value) => { this.handleChange('string', value) }}>
          <Option value='1'>Foo</Option>
          <Option value='2'>Bar</Option>
          <Option value='3'>Baz</Option>
        </Select>
        <p>Value is: {this.state.string}</p>

        <label>Select with custom</label>
        <Select onChange={(value) => { this.handleChange('custom', value) }}>
          <Option value='1'>
            <CustomLabel>Foo</CustomLabel>
          </Option>
          <Option value='2'>
            <CustomLabel>Bar</CustomLabel>
          </Option>
          <Option value='3'>
            <CustomLabel>Baz</CustomLabel>
          </Option>
        </Select>
        <p>Value is: {this.state.custom}</p>
      </div>
    )
  }
}
