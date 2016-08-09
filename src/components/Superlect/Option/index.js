import React, { PropTypes, cloneElement } from 'react'
import Focusable from '../Focusable'
import { v4 } from 'node-uuid'

const labelStyle = {
  display: 'block',
  position: 'relative',
  overflow: 'hidden'
}

const radioStyle = {
  position: 'absolute',
  left: '-100%'
}

const keyMappings = {
  13: function enter (event, { setSelected, value, index }) {
    setSelected({ value, index })
  },
  32: function space (event, { setFocused, index }) {
    event.preventDefault()
    setFocused({ index: index + 1 })
  },
  37: function left (event, { setFocused, index }) {
    event.preventDefault()
    setFocused({ index: index - 1 })
  },
  38: function up (event, { setFocused, index }) {
    event.preventDefault()
    setFocused({ index: index - 1 })
  },
  39: function right (event, { setFocused, index }) {
    event.preventDefault()
    setFocused({ index: index + 1 })
  },
  40: function down (event, { setFocused, index }) {
    event.preventDefault()
    setFocused({ index: index + 1 })
  }
}

const passStateToChild = (child, props) => (
  typeof child === 'string'
    ? child
    : cloneElement(child, props)
)

const Option = ({
  index,
  value,
  children
}, {
  name,
  selected,
  setSelected,
  focused,
  setFocused
}) => {
  const id = v4()
  const handleChange = (event) => {
    const { target } = event
    const { value } = target

    if (target.checked) {
      setSelected({ value, index })
    }
  }

  const handleKeyDown = (event) => {
    const handler = keyMappings[event.keyCode]
    if (handler) {
      handler(event, { setSelected, setFocused, index, value })
    }
  }

  return (
    <label htmlFor={id} key={value} style={labelStyle}>
      <Focusable focus={focused === index}>
        <input
          id={id}
          type='radio'
          name={name}
          value={value}
          checked={selected === value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={radioStyle}
        />
      </Focusable>
      {passStateToChild(children, {
        selected: selected === value,
        focused: focused === index
      })}
    </label>
  )
}

Option.propTypes = {
  index: PropTypes.number,
  value: PropTypes.string
}

Option.contextTypes = {
  name: PropTypes.string,
  selected: PropTypes.string,
  setSelected: PropTypes.func,
  focused: PropTypes.number,
  setFocused: PropTypes.func
}

export default Option
