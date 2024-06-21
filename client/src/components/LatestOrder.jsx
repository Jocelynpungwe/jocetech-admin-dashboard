import React from 'react'
import styled from 'styled-components'
import OrdersInfo from './OrdersInfo'

const LatestOrder = ({ orders, page }) => {
  return (
    <Wrapper>
      <h4>Latest orders</h4>
      {page === 'order-page'
        ? orders.map((order, index) => {
            return <OrdersInfo {...order} key={index} />
          })
        : orders.slice(0, 5).map((order, index) => {
            return <OrdersInfo {...order} key={index} />
          })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: var(--white);
  padding: 2rem;
`

export default LatestOrder
