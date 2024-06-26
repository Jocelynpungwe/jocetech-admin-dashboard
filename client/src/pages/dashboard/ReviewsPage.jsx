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
        <section className="review-section">
          {allReviews.length === 0 ? (
            <h5> No Review history</h5>
          ) : (
            allReviews.map((review, index) => {
              const formattedDate = moment(review.createdAt).format(
                'Do MMMM YYYY'
              )
              return (
                <article key={index} className="wrapper-container">
                  <ProductInfo
                    image={review.product.image}
                    name={review.product.name}
                    price={review.product.price}
                    id={review.product.id}
                  />

                  <ReviewInfo
                    rating={review.rating}
                    name={review.user.name}
                    date={formattedDate}
                    title={review.title}
                    comment={review.comment}
                  />
                  <div>
                    <Link
                      to={`/customers/${review.user._id}`}
                      className="btn btn-block"
                    >
                      View User
                    </Link>
                  </div>
                </article>
              )
            })
          )}
        </section>
        {numOfPages > 1 && <Pagination pageTitle="reviews" />}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.section`
  .review-section {
    display: grid;
    margin-top: 1rem;

    .wrapper-container {
      margin-bottom: 1rem;
    }

    .btn {
      margin-top: 1rem;
    }
  }
  .review {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    p,
    h5 {
      margin: 0;
    }

    .info {
      margin-bottom: 0.5rem;
    }

    .name {
      margin-right: 0.5rem;
    }

    .comment {
      margin-top: 0.5rem;
    }
  }

  @media (min-width: 750px) {
    .review-section {
      grid-template-columns: 1fr 1fr;
      grid-gap: 1rem;
      .wrapper-container {
        margin: 0;
      }
    }
  }

  @media (min-width: 992px) {
    .review-section {
      grid-template-columns: 1fr 1fr 1fr;
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
