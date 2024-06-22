import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllReviews } from '../../features/review/reviewSlice'

const ReviewsPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllReviews())
  }, [])
  return <div>ReviewsPage</div>
}

export default ReviewsPage
