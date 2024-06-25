import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filtersUpdate, getAllReviews } from '../../features/review/reviewSlice'
import {
  Error,
  Loading,
  Pagination,
  ProductInfo,
  ReviewInfo,
} from '../../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import moment from 'moment'

const ReviewsPage = () => {
  const dispatch = useDispatch()
  const {
    searchReview: allReviews,
    isLoading: loading,
    isError: error,
    text,
    page,
    numOfPages,
  } = useSelector((store) => store.review)

  useEffect(() => {
    dispatch(getAllReviews())
  }, [page])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  if (allReviews.length === 0) {
    return (
      <div className="wrapper-container">
        <h3>View All Reviews</h3>
        <h5> No Review history</h5>
      </div>
    )
  }

  return (
    <>
      <Wrapper>
        <div className="wrapper-container">
          <h3>View All Reviews</h3>
          <div className="content">
            <form>
              <div className="form-control">
                <input
                  type="text"
                  name="text"
                  value={text}
                  placeholder="search"
                  onChange={(e) => dispatch(filtersUpdate(e.target.value))}
                  className="search-input"
                />
              </div>
            </form>
          </div>
        </div>

        {allReviews.map((review, index) => {
          const formattedDate = moment(review.createdAt).format('Do MMMM YYYY')
          return (
            <section key={index} className="review-section wrapper-container">
              <div>
                <ProductInfo
                  image={review.product.image}
                  name={review.product.name}
                  price={review.product.price}
                  id={review.product.id}
                />
                <Link
                  to={`/customers/${review.user._id}`}
                  className="btn btn-block"
                >
                  View User
                </Link>
              </div>
              <ReviewInfo
                rating={review.rating}
                name={review.user.name}
                date={formattedDate}
                title={review.title}
                comment={review.comment}
              />
            </section>
          )
        })}
        {numOfPages > 1 && <Pagination pageTitle="reviews" />}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.section`
  .review-section {
    display: grid;
    margin: 1rem 0;
  }

  @media (min-width: 750px) {
    .review-section {
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 1rem;
    }
  }

  .search-input {
    padding: 0.5rem;
    background: var(--grey-50);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
    margin-bottom: 1rem;
  }

  .search-input::placeholder {
    text-transform: capitalize;
  }
`

export default ReviewsPage
