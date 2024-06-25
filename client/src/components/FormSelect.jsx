import React from 'react'

const FormSelect = ({ name, value, handleChange, labelText, arrayOptions }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {name === 'sort'
          ? arrayOptions.map((c, index) => {
              return (
                <option key={index} value={c.value}>
                  {c.label}
                </option>
              )
            })
          : arrayOptions.map((c, index) => {
              return (
                <option key={index} value={c}>
                  {c}
                </option>
              )
            })}
      </select>
    </div>
  )
}

export default FormSelect
