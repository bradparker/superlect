import { Component } from 'react'
import { findDOMNode } from 'react-dom'

const setFocus = (instance, focus) => {
  const elem = findDOMNode(instance)

  if (focus) {
    elem.focus()
  } else {
    elem.blur()
  }
}

export default class extends Component {
  componentDidMount () {
    setFocus(this, this.props.focus)
  }

  componentDidUpdate () {
    setFocus(this, this.props.focus)
  }

  render () {
    const { children } = this.props
    return children
  }
}
