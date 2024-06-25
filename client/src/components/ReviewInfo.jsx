import React from 'react'
import Stars from './Stars'
import styled from 'styled-components'

const ReviewInfo = ({ rating, name, date, title, comment }) => {
  return (
    <Wrapper>
      <div className="review">
        <Stars averageRating={rating} />
        <div className="info">
          <p className="name">{name}</p>
          <p className="date">{date}</p>
        </div>
        <h5>{title}</h5>
        <p>{comment}</p>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  box-shadow: var(--shadow-2);
  padding: 0.5rem;
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
`

export default ReviewInfo
