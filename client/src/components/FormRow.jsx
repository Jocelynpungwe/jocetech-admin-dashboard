import React from 'react'
import styled from 'styled-components'
const FormRow = ({
  type,
  name,
  value,
  placeholder,
  handleChange,
  labelText,
  required,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        name={name}
        inputMode={
          name === 'price' || name === 'inventory' ? 'numeric' : 'none'
        }
        placeholder={placeholder ? placeholder : ''}
        required={required ? true : false}
        onChange={handleChange}
        className={type === 'checkbox' ? '' : 'form-input'}
      />
    </div>
  )
}

export default FormRow
