import React, {
  Component,
  PropTypes,
  cloneElement
} from 'react'
import { v4 } from 'node-uuid'
import FocusAggregate from '../FocusAggregate'

const addIndex = (child, index) => (
  cloneElement(child, { index, key: index })
)

const limit = (n, l) => (
  n < 0 ? 0 : Math.min(n, l)
)

const model = {
  selected: '',
  focused: -1
}

const update = (state = {}, { type, payload }) => {
  console.log(type, payload, state)
  switch (type) {
    case 'SET_FOCUSED':
      return {
        ...state,
        focused: limit(payload.index, payload.max)
      }
    case 'CLEAR_FOCUSED':
      return {
        ...state,
        focused: -1
      }
    case 'SET_SELECTED':
      return {
        ...state,
        selected: payload.value,
        focused: payload.index
      }
    default:
      return state
  }
}

class OptionList extends Component {
  constructor () {
    super()

    this.state = model

    this.setSelected = this.setSelected.bind(this)
    this.setFocused = this.setFocused.bind(this)
    this.clearFocused = this.clearFocused.bind(this)
  }

  getChildContext () {
    const { name } = this.props
    const { selected, focused } = this.state

    return {
      name,
      selected,
      setSelected: this.setSelected,
      focused,
      setFocused: this.setFocused
    }
  }

  setSelected ({ value, index }) {
    const { props, state } = this
    const { onChange } = props

    this.setState(update(state, {
      type: 'SET_SELECTED',
      payload: {
        index,
        value
      }
    }), () => {
      onChange(value)
    })
  }

  setFocused ({ index }) {
    const { props, state } = this
    const max = props.children.length - 1

    this.setState(update(state, {
      type: 'SET_FOCUSED',
      payload: {
        index,
        max
      }
    }))
  }

  clearFocused () {
    const { state, props } = this
    const { onBlur = () => {} } = props

    this.setState(update(state, {
      type: 'CLEAR_FOCUSED'
    }), () => {
      onBlur()
    })
  }

  render () {
    const { children } = this.props
    return (
      <FocusAggregate onBlur={this.clearFocused}>
        <div>{children.map(addIndex)}</div>
      </FocusAggregate>
    )
  }
}

OptionList.defaultProps = {
  name: v4(),
  onChange: () => {}
}

OptionList.childContextTypes = {
  name: PropTypes.string,
  selected: PropTypes.string,
  setSelected: PropTypes.func,
  focused: PropTypes.number,
  setFocused: PropTypes.func
}

export default OptionList
