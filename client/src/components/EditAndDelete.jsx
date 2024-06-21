import React from 'react'
import styled from 'styled-components'

import { FaEdit, FaTrash } from 'react-icons/fa'

const EditAndDelete = ({ handleClickEdit, handleClickDelete }) => {
  return (
    <Wrapper>
      <button className="secondary-btn" onClick={handleClickEdit}>
        <FaEdit />
        Edit
      </button>
      <button className="secondary-btn btn-danger" onClick={handleClickDelete}>
        <FaTrash />
        Delete
      </button>
      {/* FIX BUTTON SIZES */}
    </Wrapper>
  )
}
const Wrapper = styled.footer`
  margin-top: 1rem;
  display: flex;
  column-gap: 10px;
  align-items: center;
`
export default EditAndDelete
