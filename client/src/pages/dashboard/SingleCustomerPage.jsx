import { useEffect, useState } from 'react'
import {
  getSingleUser,
  getSingleUserOrder,
  updateSingleUser,
} from '../../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Loading, Error, ProductInfo, UserInfo, Stars } from '../../components'
import { formatPrice } from '../../utils/helpers'
import moment from 'moment'
import { getSingleUserReview } from '../../features/review/reviewSlice'

const SingleCustomerPage = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const {
    singleUserOrder,
    singleUser,
    isLoading: loading,
    isError: error,
  } = useSelector((store) => store.user)

  const {
    singleUserReviews,
    isUserReviewLoading: reviewLoading,
    isUserReviewError: reviewError,
  } = useSelector((store) => store.review)

  useEffect(() => {
    dispatch(getSingleUserOrder(id))
    dispatch(getSingleUser(id))
    dispatch(getSingleUserReview(id))
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
      <div>
        <h4>User Product Review</h4>
        {reviewLoading === true || !singleUserReviews ? (
          <Loading />
        ) : reviewError === true ? (
          <Error />
        ) : singleUserReviews.length === 0 ? (
          <h3> No Review history</h3>
        ) : (
          singleUserReviews.map((review, index) => {
            const formattedDate = moment(review.createdAt).format(
              'MMMM Do YYYY'
            )
            return (
              <section key={index}>
                <div key={review._id}>
                  <div className="review">
                    <Stars averageRating={review.rating} />
                    <div className="info">
                      <p className="date">{formattedDate}</p>
                    </div>
                    <h5>{review.title}</h5>
                    <p>{review.comment}</p>
                  </div>
                  <hr />
                </div>
                <div className="wrapper-div">
                  <ProductInfo
                    image={review.product.image}
                    name={review.product.name}
                    price={review.product.price}
                    id={review.product.id}
                  />
                </div>
              </section>
            )
          })
        )}
      </div>
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

  .star {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  .group-rating {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-column-gap: 1rem;
    margin-bottom: 1rem;
  }
  .overal-rate-bar {
    background-color: var(--primary-gray);
    border-radius: 10px;
    max-height: 1rem;
    width: '80%';
  }
  h4 {
    font-size: 1rem;
  }
  .review {
    padding: 1rem 0;
    text-align: left;
  }

  .review .info {
    display: flex;
  }
  .name {
    font-weight: 700;
    margin-right: 10px;
  }
  .date {
    opacity: 0.5;
  }

  .btn-review {
    font-size: 1rem;
    color: var(--white);
    padding: 5px 10px;
    border: none;
    border: 15px;
    cursor: pointer;
  }

  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-900);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
`

export default SingleCustomerPage
