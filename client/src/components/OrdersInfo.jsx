import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'
import { formatPrice } from '../utils/helpers'

const OrdersInfo = ({ shippingAddress, total, status, updatedAt, id }) => {
  return (
    <Wrapper>
      <span>{moment(updatedAt).format('YYYY-MM-DD')}</span>
      <h4>{shippingAddress?.name}</h4>
      <h5>{shippingAddress?.email}</h5>
      <span>{formatPrice(total)}</span>
      <span
        className="status"
        style={{
          textTransform: 'uppercase',
          fontWeight: '700',
          color:
            status === 'paid'
              ? 'var(--green-dark)'
              : status === 'pending'
              ? 'var(--primary-900)'
              : 'red',
        }}
      >
        {status}
      </span>

      <Link to={`/order/${id}`} className="primary-btn">
        View Order
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border-bottom: 1px gray solid;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  h4,
  h5 {
    font-size: 1rem;
    margin: 5px 0;
    opacity: 0.5;
  }

  h5 {
    font-weight: 700;
  }
  span {
    opacity: 0.5;
  }

  .status {
    opacity: 1;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

export default OrdersInfo
