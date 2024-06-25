import React from 'react'

const FormTextArea = ({ name, labelText, value, handleChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder="Type here"
        onChange={handleChange}
        value={value}
        className="form-textarea"
        required
      ></textarea>
    </div>
  )
}

export default FormTextArea
