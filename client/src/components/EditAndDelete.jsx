import React from 'react'
import styled from 'styled-components'

import { FaEdit, FaTrash } from 'react-icons/fa'

const EditAndDelete = ({ handleClickEdit, handleClickDelete }) => {
  return (
    <Wrapper>
      <button className="secondary-btn btn-block" onClick={handleClickEdit}>
        <FaEdit className="icon" />
        Edit
      </button>
      <button
        className="secondary-btn btn-danger btn-block"
        onClick={handleClickDelete}
      >
        <FaTrash className="icon" />
        Delete
      </button>
    </Wrapper>
  )
}
const Wrapper = styled.footer`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  .icon {
    margin: 0 3px 3px 0;
  }
  .secondary-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
  }
`
export default EditAndDelete
