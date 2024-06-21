import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  completeOrder,
  getSingleOrders,
  updateStatus,
} from '../../features/order/orderSlice'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { formatPrice } from '../../utils/helpers'
import { Loading, Error, ProductInfo, OrderOptions } from '../../components'
import moment from 'moment'

const ViewOrderPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const {
    singleOrder,
    orderLoading: loading,
    orderError: error,
    status: completeStatus,
  } = useSelector((store) => store.order)

  useEffect(() => {
    dispatch(getSingleOrders(id))
  }, [id])

  if (loading || !singleOrder) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  const {
    orderItems,
    shippingAddress,
    status,
    shippingFee,
    tax,
    subtotal,
    total,
    createdAt,
    updatedAt,
  } = singleOrder

  const handleStatusChange = (e) => {
    const value = e.target.value
    dispatch(updateStatus(value))
  }

  return (
    <Wrapper>
      <h3>View Single Order</h3>
      <section>
        {orderItems.map((order, index) => {
          const {
            image,
            name,
            amount,
            price,
            color,
            product: productId,
          } = order

          return (
            <div key={index} className="wrapper-div">
              <ProductInfo
                image={image}
                name={name}
                price={price}
                id={productId}
                amount={amount}
                color={color}
              />
            </div>
          )
        })}
      </section>
      <section className="shipping-container">
        <div className="wrapper-div">
          <h5>Shipping Address</h5>
          <p>User Name: {shippingAddress.name}</p>
          <p>User Email: {shippingAddress.email}</p>
          <p>Street: {shippingAddress.line1}</p>
          <p>City: {shippingAddress.city}</p>
          <p>Postal Code: {shippingAddress.postal_code}</p>
          <p>State: {shippingAddress.state}</p>
          <p>Country: Canada</p>
        </div>
        <div className="wrapper-div">
          <h5>Billing Info</h5>
          <p>Shipping: {formatPrice(shippingFee)}</p>
          <p>Tax: {formatPrice(tax)}</p>
          <p>Subtotal: {formatPrice(subtotal)}</p>
          <div>
            <p>Order Placed Date: {moment(createdAt).format('YYYY-MM-DD')}</p>
            <p className="info">
              <span>Total:</span>
              {formatPrice(total)}
            </p>
            <p className="info">
              <span>Status:</span>
              {status}
            </p>
            <p>Order Updated Date: {moment(updatedAt).format('YYYY-MM-DD')}</p>
          </div>
          <div>
            <OrderOptions
              name="status"
              value={completeStatus}
              labelText="Select Status"
              handleChange={handleStatusChange}
            />
            <button
              className="btn primary-btn btn-block"
              onClick={() =>
                dispatch(completeOrder({ status: completeStatus, id }))
              }
            >
              Update Status
            </button>
          </div>
        </div>
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  h5,
  p {
    opacity: 0.5;
  }

  h5 {
    margin: 5px 0;
  }

  p {
    margin: 0 0 5px 0;
  }

  .wrapper-div {
    box-shadow: var(--shadow-4);
    border-radius: var(--radius);
    padding: 1rem;
    background-color: var(--white);
  }

  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 650px) {
    .shipping-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 1rem;
      margin-top: 1rem;
    }
  }
`

export default ViewOrderPage
