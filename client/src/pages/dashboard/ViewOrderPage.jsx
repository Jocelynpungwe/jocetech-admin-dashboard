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
import {
  Loading,
  Error,
  ProductInfo,
  OrderOptions,
  PageTitle,
} from '../../components'
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
    <>
      <PageTitle
        name="View Single Order"
        label="Back To Order"
        linkName="orders"
      />
      <Wrapper>
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

            console.log(order)

            return (
              <div key={index} className="wrapper-container">
                <ProductInfo
                  image={image}
                  name={name}
                  price={price}
                  id={productId}
                  amount={amount}
                  colors={[`#${color}`]}
                />
              </div>
            )
          })}
        </section>
        <section className="shipping-container">
          <div className="shipping wrapper-container">
            <h5>Shipping Address</h5>
            <p className="info">
              <span>User Name : </span>
              {shippingAddress.name}
            </p>
            <p className="info">
              <span>User Email :</span> {shippingAddress.email}
            </p>
            <p className="info">
              <span>Street :</span> {shippingAddress.line1}
            </p>
            <p className="info">
              <span>City :</span> {shippingAddress.city}
            </p>
            <p className="info">
              <span>Postal Code :</span> {shippingAddress.postal_code}
            </p>
            <p className="info">
              <span>State :</span> {shippingAddress.state}
            </p>
            <p className="info">
              <span>Country :</span> Canada
            </p>
          </div>
          <div className="billing wrapper-container">
            <h5>Billing Info</h5>
            <p className="info">
              <span>Shipping :</span>
              {formatPrice(shippingFee)}
            </p>
            <p className="info">
              <span>Tax :</span>
              {formatPrice(tax)}
            </p>
            <p className="info">
              <span>Subtotal :</span>
              {formatPrice(subtotal)}
            </p>
            <div>
              <p className="info">
                <span>Placed Date :</span>{' '}
                {moment(createdAt).format('YYYY-MM-DD')}
              </p>
              <p className="info">
                <span>Total :</span>
                {formatPrice(total)}
              </p>
              <p className="info">
                <span>Status :</span>
                {status}
              </p>
              <p className="info">
                <span>Updated Date :</span>{' '}
                {moment(updatedAt).format('YYYY-MM-DD')}
              </p>
            </div>
            <div>
              <OrderOptions
                name="status"
                value={completeStatus}
                labelText="Select Status"
                handleChange={handleStatusChange}
              />
              <button
                className="btn btn-block"
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
    </>
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

  .wrapper-container {
    box-shadow: var(--shadow-4);
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

  .shipping-container {
    margin-top: 1rem;
    .shipping {
      margin-bottom: 1rem;
    }
  }

  @media (min-width: 750px) {
    .shipping-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 1rem;
      .shipping {
        margin-bottom: none;
      }
    }
  }
`

export default ViewOrderPage
