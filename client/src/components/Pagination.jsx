import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { changePage } from '../features/product/productSlice'
import { changePageReview, filtersUpdate } from '../features/review/reviewSlice'

const Pagination = ({ pageTitle }) => {
  const { numOfPages, page } =
    pageTitle === 'reviews'
      ? useSelector((store) => store.review)
      : useSelector((store) => store.products)
  const dispatch = useDispatch()

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1
  })

  const handleReview = (newPage) => {
    dispatch(changePageReview(newPage))
    dispatch(filtersUpdate(''))
  }

  const nextPage = () => {
    let newPage = page + 1
    if (newPage > numOfPages) {
      newPage = 1
    }
    pageTitle === 'reviews'
      ? handleReview(newPage)
      : dispatch(changePage(newPage))
  }
  const prevPage = () => {
    let newPage = page - 1
    if (newPage < 1) {
      newPage = numOfPages
    }

    pageTitle === 'reviews'
      ? handleReview(newPage)
      : dispatch(changePage(newPage))
  }

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              key={pageNumber}
              onClick={() => {
                pageTitle === 'reviews'
                  ? handleReview(pageNumber)
                  : dispatch(changePage(pageNumber))
              }}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  height: 5rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-wrap: wrap;
  gap: 1rem;
  .btn-container {
    background: var(--primary-900);
    border-radius: var(--borderRadius);
  }
  .pageBtn {
    background: transparent;
    border-color: transparent;
    width: 40px;
    height: 30px;
    font-weight: 700;
    font-size: 1rem;
    color: var(--white);
    transition: var(--transition);
    border-radius: var(--borderRadius);
    cursor: pointer;
  }
  .active {
    background: var(--grey-300);
    color: var(--black);
  }
  .prev-btn,
  .next-btn {
    width: 80px;
    height: 30px;
    background: var(--primary-900);
    border-color: transparent;
    border-radius: var(--borderRadius);
    color: var(--white);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
  }
  .prev-btn:hover,
  .next-btn:hover,
  .pageBtn:hover {
    background: var(--primary-500);
  }
`

export default Pagination
