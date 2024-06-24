import React from 'react'

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  placeholder,
  required,
  inputMode,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      {value ? (
        <input
          id={name}
          type={type}
          value={value}
          name={name}
          inputMode={inputMode && inputMode}
          placeholder={placeholder && 'Type here'}
          required={required ? true : false}
          onChange={handleChange}
          className="form-input"
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          onChange={handleChange}
          className="form-input"
        />
      )}
    </div>
  )
}

export default FormRow
