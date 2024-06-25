import React from 'react'

import OrdersInfo from './OrdersInfo'

const LatestOrder = ({ orders, page }) => {
  return (
    <section className="wrapper-container">
      <h5 className="title">
        {page === 'order-page' ? 'All Orders' : 'Latest orders'}
      </h5>
      {page === 'order-page'
        ? orders.map((order, index) => {
            return <OrdersInfo {...order} key={index} />
          })
        : orders.slice(0, 5).map((order, index) => {
            return <OrdersInfo {...order} key={index} />
          })}
    </section>
  )
}

export default LatestOrder
