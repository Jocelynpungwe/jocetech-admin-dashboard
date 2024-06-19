import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const AddItems = ({ name, label, linkName }) => {
  return (
    <Wrapper>
      <div className="info">
        <h3>{name}</h3>
        <Link to={`/${linkName}`} className="btn primary-btn">
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
