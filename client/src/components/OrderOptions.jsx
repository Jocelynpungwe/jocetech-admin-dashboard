import React from 'react'
import styled from 'styled-components'

const OrderOptions = ({ name, value, handleChange, labelText }) => {
  return (
    <Wrapper>
      <form>
        <div className="form-row">
          <label className="form-label" htmlFor={name}>
            {labelText}
          </label>
          <select
            name={name}
            id={name}
            value={value}
            onChange={handleChange}
            className="form-select"
          >
            {name === 'sort' && <option value="all">All</option>}
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="delivered">Delevered</option>
            <option value="failed">Failed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }
`

export default OrderOptions
