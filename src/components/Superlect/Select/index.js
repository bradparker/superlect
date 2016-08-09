import React from 'react'
import OptionList from '../OptionList'

export default ({
  name,
  onChange,
  onBlur,
  children
}) => (
  <OptionList
    name={name}
    onBlur={onBlur}
    onChange={onChange}
  >
    {children}
  </OptionList>
)
