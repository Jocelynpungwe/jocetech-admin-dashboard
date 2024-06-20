import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleEdit } from '../features/product/productSlice'

const AddItems = ({ name, label, linkName, clear }) => {
  const dispatch = useDispatch()
  const { isEdit } = useSelector((store) => store.products)

  return (
    <Wrapper>
      <div className="info">
        <h3>{name}</h3>
        <Link
          onClick={() => {
            if (isEdit) {
              dispatch(toggleEdit({ id: '' }))
              dispatch(clear())
            }
          }}
          to={`/${linkName}`}
          className="btn primary-btn"
        >
          {label}
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

export default AddItems
