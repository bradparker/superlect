import React, { Component } from 'react'

export default class extends Component {
  constructor () {
    super()

    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  handleFocus (...args) {
    const { onFocus = () => {} } = this.props

    clearTimeout(this.timer)
    onFocus(...args)
  }

  handleBlur (...args) {
    const { onBlur = () => {} } = this.props

    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      onBlur(...args)
    }, 100)
  }

  render () {
    const { children } = this.props
    return (
      <div
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}>
        {children}
      </div>
    )
  }
}
