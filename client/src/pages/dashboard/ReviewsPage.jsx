import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllReviews } from '../../features/review/reviewSlice'
import { Error, Loading, Stars, ProductInfo } from '../../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import moment from 'moment'

const ReviewsPage = () => {
  const dispatch = useDispatch()
  const {
    allReviews,
    isLoading: loading,
    isError: error,
  } = useSelector((store) => store.review)

  console.log(allReviews)

  useEffect(() => {
    dispatch(getAllReviews())
  }, [])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  if (allReviews.length === 0) {
    return <h3> No Review history</h3>
  }

  return (
    <Wrapper>
      <h3>View All Reviews</h3>
      {allReviews.map((review, index) => {
        const formattedDate = moment(review.createdAt).format('MMMM Do YYYY')
        return (
          <section key={index}>
            <div>
              <div className="review">
                <Stars averageRating={review.rating} />
                <div className="info">
                  <p className="date">{formattedDate}</p>
                </div>
                <h5>{review.title}</h5>
                <p>{review.comment}</p>
              </div>
              <Link
                to={`/customers/${review.user._id}`}
                className="primary-btn"
              >
                View User
              </Link>
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
      })}
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
`

export default ReviewsPage
