import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({ averageRating, reviews, showReview }) => {
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5
    return (
      <span key={index}>
        {averageRating > number ? (
          <BsStarFill />
        ) : averageRating > index ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    )
  })

  return (
    <Wrapper>
      <div className="stars">{tempStars}</div>
      {showReview && <p className="reviews">({reviews} customer reviews)</p>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  margin-bottom: 0.5rem;
`

export default Stars
