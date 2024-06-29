import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'
import { formatPrice } from '../utils/helpers'

const OrdersInfo = ({ shippingAddress, total, status, updatedAt, id }) => {
  return (
    <Wrapper>
      <span>{moment(updatedAt).format('YYYY-MM-DD')}</span>
      <h6>{shippingAddress?.name}</h6>
      <h7>{shippingAddress?.email}</h7>
      <span>{formatPrice(total)}</span>
      <span
        className="status"
        style={{
          color:
            status === 'paid'
              ? 'var(--green-dark)'
              : status === 'pending'
              ? 'var(--primary-900)'
              : status === 'failed'
              ? 'var(--red-light)'
              : status === 'delivered'
              ? 'var(--green-light)'
              : status === 'canceled'
              ? 'red'
              : 'red',
        }}
      >
        {status}
      </span>
      <Link to={`/orders/${id}`} className=" primary-btn">
        View Order
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px var(--grey-100) solid;
  padding: 1rem;

  .primary-btn {
    width: 100%;
  }

  h6,
  h7 {
    text-align: center;
    font-size: 1rem;
    margin: 5px 0;
    opacity: 0.5;
    font-weight: 700;
    margin-right: 0.625rem;
  }

  span {
    text-align: center;
    align-self: center;
    opacity: 0.5;
  }

  .status {
    text-transform: uppercase;
    font-weight: 700;
    width: 80px;
    opacity: 1;
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr auto;

    .primary-btn {
      text-align: center;
      padding: 0.5rem 1rem;
      font-size: 1rem;
    }
  }
`

export default OrdersInfo
