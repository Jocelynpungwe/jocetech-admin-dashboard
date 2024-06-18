import React from 'react'
import styled from 'styled-components'
import OrdersInfo from './OrdersInfo'

const LatestOrder = ({ orders }) => {
  return (
    <Wrapper>
      <h4>Latest orders</h4>
      {orders.slice(0, 5).map((order, index) => {
        return <OrdersInfo {...order} />
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: var(--white);
  padding: 2rem;
`

export default LatestOrder
