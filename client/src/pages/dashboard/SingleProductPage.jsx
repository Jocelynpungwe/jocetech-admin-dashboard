import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getSingleProduct,
  getSingleProductReview,
} from '../../features/product/productSlice'

import { useParams } from 'react-router-dom'
import { formatPrice } from '../../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  Stars,
  Reviews,
  PageTitle,
} from '../../components'

import styled from 'styled-components'
import moment from 'moment'

const SingleProductPage = () => {
  const { id } = useParams()

  const dispatch = useDispatch()
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    single_product_review: singleProductReview,
    single_product_review_loading: singleReviewLoading,
    single_product_review_error: singleReviewError,
    page,
  } = useSelector((store) => store.products)

  useEffect(() => {
    dispatch(getSingleProduct(id))
    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    dispatch(getSingleProductReview(id))
  }, [id, page])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  const {
    name,
    price,
    description,
    inventory,
    averageRating,
    colors,
    id: sku,
    company,
    image,
    features,
    box,
    freeShipping,
    featured,
    groupRating,
    numOfReviews,
    category,
    createdAt,
  } = product

  console.log(colors)

  return (
    <>
      <PageTitle
        name="Single Products"
        label="Back To Products"
        linkName="products"
      />
      <Wrapper>
        <section className="wrapper-container">
          <div className="product-center">
            <ProductImages image={image} />
            <section className="content">
              <h2 className="title">{name}</h2>
              <Stars
                averageRating={averageRating}
                reviews={numOfReviews}
                showReview={true}
              />
              <h3 className="price">{formatPrice(price)}</h3>
              <p className="desc">{description}</p>
              <p className="info">
                <span>SKU :</span>
                {sku}
              </p>
              <p className="info">
                <span>Created :</span>
                {moment(createdAt).format('Do MMMM YYYY')}
              </p>
              <p className="info">
                <span>Available : </span>
                {inventory > 0 ? 'In stock' : 'out of stock'}
              </p>
              <p className="info">
                <span>Inventory :</span>
                {inventory}
              </p>
              <p className="info">
                <span>Company :</span>
                {company}
              </p>
              <p className="info">
                <span>Category :</span>
                {category}
              </p>
              <div className="colors">
                <p className="info">
                  <span>colors :</span>
                </p>
                <div className="color-container">
                  {colors &&
                    colors.length > 0 &&
                    colors.map((color, index) => {
                      return (
                        <div
                          className="color-span"
                          key={index}
                          style={{ background: color }}
                        ></div>
                      )
                    })}
                </div>
              </div>
              <p className="info">
                <span>Free Shipping :</span>
                {freeShipping ? 'Yes' : 'No'}
              </p>
              <p className="info">
                <span>Featured :</span>
                {featured ? 'Yes' : 'No'}
              </p>
            </section>
          </div>
          <div>
            <div className="feature-and-inbox-container">
              <div>
                <h3 className="title">Feature</h3>
                <p className="desc">{features}</p>
              </div>
              <div className="inbox-container">
                <h3 className="title">In The Box</h3>
                {box &&
                  box.map((c) => {
                    return (
                      <p>
                        <span key={c}>{c.substring(0, 3)}</span>
                        {c.substring(3)}
                      </p>
                    )
                  })}
              </div>
            </div>
            {singleReviewLoading ? (
              <Loading />
            ) : singleReviewError ? (
              <Error />
            ) : (
              <>
                <h3 className="title">Reviews</h3>
                <Reviews
                  reviews={singleProductReview}
                  groupRating={groupRating}
                  averageRating={averageRating}
                  productId={id}
                />
              </>
            )}
          </div>
        </section>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.main`
  .price {
    color: var(--primary-900);
    font-size: 1.25rem;
  }
  .desc {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 0.5rem;
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

  p {
    margin: 0;
  }

  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }

  .inbox-container {
    p {
      font-size: 15px;
      font-weight: 500;
      line-height: 25px; /* 166.667% */
      opacity: 0.5;
      margin-top: 0;
      margin-bottom: 10px;
      span {
        color: var(--primary-900);
        font-size: 15px;
        font-weight: 700;
        line-height: 25px; /* 166.667% */
      }
    }
  }

  .feature-and-inbox-container {
    margin: 50px 0;
  }

  .color-container,
  .colors {
    display: flex;
  }

  .color-container {
    margin-left: -177px;
  }

  .color-span {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    margin-right: 0.4rem;
    border: 2px solid var(--grey-100);
  }

  @media (min-width: 550px) {
    .product-image-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 10px;
    }
  }

  @media (min-width: 768px) {
    .feature-and-inbox-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 100px;
    }
  }
  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
  }
`

export default SingleProductPage
