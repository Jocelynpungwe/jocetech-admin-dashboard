import { useEffect } from 'react'
import {
  getSingleUser,
  getSingleUserOrder,
} from '../../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Loading, Error, ProductInfo, UserInfo } from '../../components'
import { formatPrice } from '../../utils/helpers'
import moment from 'moment'

const SingleCustomerPage = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const {
    singleUserOrder,
    singleUser,
    isLoading: loading,
    isError: error,
  } = useSelector((store) => store.user)

  useEffect(() => {
    dispatch(getSingleUserOrder(id))
    dispatch(getSingleUser(id))
  }, [id])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <Wrapper>
      <div className="customer-info">
        <h3>Single Customer Info</h3>
        <UserInfo {...singleUser} page="single-customers" />
      </div>
      <h4>Order History</h4>
      {singleUserOrder.length === 0 ? (
        <h5>No Order History</h5>
      ) : (
        singleUserOrder.map((orderPlaced, index) => {
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
          } = orderPlaced

          return (
            <section>
              <article key={index}>
                {orderItems.map((currentOrder, index) => {
                  const {
                    image,
                    name,
                    amount,
                    price,
                    color,
                    product: productId,
                  } = currentOrder

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
              </article>
              <article className="shipping-container">
                <div className="wrapper-div">
                  <h5>Shipping Address</h5>
                  <p>User Name: {shippingAddress?.name}</p>
                  <p>User Email: {shippingAddress?.email}</p>
                  <p>Street: {shippingAddress?.line1}</p>
                  <p>City: {shippingAddress?.city}</p>
                  <p>Postal Code: {shippingAddress?.postal_code}</p>
                  <p>State: {shippingAddress?.state}</p>
                  <p>Country: Canada</p>
                </div>
                <div className="wrapper-div">
                  <h5>Billing Info</h5>
                  <p>Shipping: {formatPrice(shippingFee)}</p>
                  <p>Tax: {formatPrice(tax)}</p>
                  <p>Subtotal: {formatPrice(subtotal)}</p>
                  <div>
                    <p>
                      Order Placed Date:{' '}
                      {moment(createdAt).format('YYYY-MM-DD')}
                    </p>
                    <p className="info">
                      <span>Total:</span>
                      {formatPrice(total)}
                    </p>
                    <p className="info">
                      <span>Status:</span>
                      {status}
                    </p>
                    <p>
                      Order Updated Date:{' '}
                      {moment(updatedAt).format('YYYY-MM-DD')}
                    </p>
                  </div>
                </div>
              </article>
            </section>
          )
        })
      )}
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

  .customer-info {
    background-color: var(--white);
    padding: 1rem;
    margin-bottom: 1rem;
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

export default SingleCustomerPage
