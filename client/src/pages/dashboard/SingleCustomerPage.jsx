import { useEffect, useState } from 'react'
import {
  getSingleUser,
  getSingleUserOrder,
  updateSingleUser,
} from '../../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  Loading,
  Error,
  ProductInfo,
  UserInfo,
  Stars,
  PageTitle,
  ShippingInfo,
  BillingInfo,
  ReviewInfo,
} from '../../components'
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
    <>
      <PageTitle
        name="View Single Customer"
        label="Back To Customers"
        linkName="Customers"
      />
      <Wrapper>
        <div className="wrapper-container">
          <UserInfo {...singleUser} page="single-customers" />
        </div>
        <h3 className="title">Order History</h3>
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
                <article
                  key={index}
                  style={{ margin: '1rem 0' }}
                  className={
                    orderItems.length === 2
                      ? 'order-length-two'
                      : orderItems.length >= 3
                      ? 'order-length-three'
                      : 'order-length'
                  }
                >
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
                      <div key={index} className="wrapper-container order">
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
                </article>
                <article className="shipping-container">
                  <ShippingInfo
                    name={shippingAddress?.name}
                    email={shippingAddress?.email}
                    line1={shippingAddress?.line1}
                    city={shippingAddress?.city}
                    postal={shippingAddress?.postal_code}
                    state={shippingAddress?.state}
                  />
                  <BillingInfo
                    shippingFee={shippingFee}
                    tax={tax}
                    subtotal={subtotal}
                    createdAt={createdAt}
                    total={total}
                    status={status}
                    updatedAt={updatedAt}
                  />
                </article>
              </section>
            )
          })
        )}
        <div>
          <h3 className="title">User Product Review</h3>
          {reviewLoading === true || !singleUserReviews ? (
            <Loading />
          ) : reviewError === true ? (
            <Error />
          ) : singleUserReviews.length === 0 ? (
            <h5> No Review history</h5>
          ) : (
            singleUserReviews.map((review, index) => {
              const formattedDate = moment(review.createdAt).format(
                'MMMM Do YYYY'
              )

              return (
                <section key={index}>
                  <div className="review-section wrapper-container">
                    <ProductInfo
                      image={review.product.image}
                      name={review.product.name}
                      price={review.product.price}
                      id={review.product.id}
                    />
                    <div className={index % 2 !== 0 ? 'order-change' : ''}>
                      <ReviewInfo
                        rating={review.rating}
                        name={review.user.name}
                        date={formattedDate}
                        title={review.title}
                        comment={review.comment}
                      />
                    </div>
                  </div>
                </section>
              )
            })
          )}
        </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.section`
  .title {
    margin: 1rem 0;
  }

  .order {
    box-shadow: var(--shadow-2);
  }

  .order-length-two,
  .order-length-three,
  .review-section,
  .shipping-container {
    display: grid;
  }

  .review-section {
    margin: 1rem 0;
  }

  .shipping-container {
    grid-row-gap: 1rem;
  }

  @media (min-width: 750px) {
    .order-change {
      order: -1;
    }
    .order-length-two {
      grid-template-columns: 1fr 1fr;
    }

    .order-length-three {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .review-section {
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 1rem;
    }
    .shipping-container {
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 1rem;
      grid-row-gap: 0;
    }
  }
`

export default SingleCustomerPage
