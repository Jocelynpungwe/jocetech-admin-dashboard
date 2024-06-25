import { useState, useEffect } from 'react'
import { BsStarFill } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'
import ReviewInfo from './ReviewInfo'
import Pagination from './Pagination'

const Reviews = ({ reviews, groupRating = [], averageRating, productId }) => {
  const [totalGroupRating, setTotalGroupRating] = useState(0)
  const { numOfPages } = useSelector((store) => store.products)

  useEffect(() => {
    if (groupRating.length > 0)
      setTotalGroupRating(
        groupRating.reduce((prev, curr) => {
          return prev + curr.groupRating
        }, 0)
      )
  }, [groupRating])

  return (
    <Wrapper>
      <h3 className="title" style={{ marginBottom: '0.9rem' }}>
        {averageRating}{' '}
        <span className="star">
          <BsStarFill />
        </span>{' '}
        overall rating
      </h3>
      {groupRating.length > 0 &&
        groupRating.map((rating) => {
          return (
            <div key={rating._id} className="group-rating">
              <h4>{rating._id} stars</h4>
              <div className="overal-rate-bar">
                <div
                  style={{
                    width: `${Math.ceil(
                      (rating.groupRating / totalGroupRating) * 100
                    )}%`,
                    backgroundColor: 'var( --primary-500)',
                    height: '100%',
                    borderRadius: '10px',
                  }}
                ></div>
              </div>
              <h4>
                {Math.ceil((rating.groupRating / totalGroupRating) * 100)}%
              </h4>
            </div>
          )
        })}
      {reviews.map((review) => {
        const formattedDate = moment(review.createdAt).format('Do MMMM YYYY')
        return (
          <div key={review._id}>
            <ReviewInfo
              rating={review.rating}
              name={review.user.name}
              date={formattedDate}
              title={review.title}
              comment={review.comment}
            />
          </div>
        )
      })}
      {numOfPages > 1 && <Pagination />}
    </Wrapper>
  )
}

const Wrapper = styled.section`
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
`

export default Reviews
