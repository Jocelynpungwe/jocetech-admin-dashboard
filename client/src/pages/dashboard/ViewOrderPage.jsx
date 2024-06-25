import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  completeOrder,
  getSingleOrders,
  updateStatus,
} from '../../features/order/orderSlice'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import {
  Loading,
  Error,
  ProductInfo,
  OrderOptions,
  PageTitle,
  ShippingInfo,
  BillingInfo,
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
          <ShippingInfo
            name={shippingAddress.name}
            email={shippingAddress.email}
            line1={shippingAddress.line1}
            city={shippingAddress.city}
            postal={shippingAddress.postal_code}
            state={shippingAddress.state}
          />
          <div className="wrapper-container">
            <BillingInfo
              shippingFee={shippingFee}
              tax={tax}
              subtotal={subtotal}
              createdAt={createdAt}
              total={total}
              status={status}
              updatedAt={updatedAt}
            />
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
