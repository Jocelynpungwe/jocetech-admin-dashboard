import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'
import {
  updateSort,
  sortProduct,
  updateFilters,
  filterProducs,
} from '../features/product/productSlice'

import styled from 'styled-components'

const Filters = () => {
  const dispatch = useDispatch()
  const {
    filters: { text, category, company },
    products,
    sort,
  } = useSelector((store) => store.products)

  const categories = getUniqueValues(products, 'category')
  const companies = getUniqueValues(products, 'company')

  const filtersUpdate = (e) => {
    let name = e.target.name
    let value = e.target.value
    if (name === 'category') {
      value = e.target.textContent
    }

    if (name === 'price') {
      value = Number(value)
    }
    if (name === 'shipping') {
      value = e.target.checked
    }

    if (name === 'categoryOption') {
      name = 'category'
    }

    dispatch(updateFilters({ name, value }))
    dispatch(filterProducs())
  }

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              value={text}
              placeholder="search"
              onChange={filtersUpdate}
              className="search-input"
            />
          </div>
          {/* end of search input */}

          {/* category */}
          <div className="form-control">
            <div>
              <h5>category</h5>

              <select
                name="categoryOption"
                value={category}
                onChange={filtersUpdate}
                className="company"
              >
                {categories.map((c, index) => {
                  return (
                    <option key={index} value={c}>
                      {c}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          {/* end of category */}

          {/* company */}
          <div className="form-control">
            <div>
              <h5>company</h5>
              <select
                name="company"
                value={company}
                onChange={filtersUpdate}
                className="company"
              >
                {companies.map((c, index) => {
                  return (
                    <option key={index} value={c}>
                      {c}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          {/* end of company */}
          {/* Sort */}
          <div className="form-control">
            <div>
              <h5>Sort</h5>
              <select
                name="sort"
                id="sort"
                value={sort}
                onChange={(e) => {
                  const value = e.target.value
                  dispatch(updateSort(value))
                  dispatch(sortProduct())
                }}
                className="company"
              >
                <option value="price-lowest">price (lowest)</option>
                <option value="price-highest">price (highest)</option>
                <option value="name-a">name (a - z)</option>
                <option value="name-z">name (z - a)</option>
              </select>
            </div>
          </div>

          {/* end sort */}
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      font-size: 1rem;
      margin-right: 0.5rem;
    }
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--grey-50);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }

  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--primary-blackish);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--grey-50);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }

  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
`

export default Filters
