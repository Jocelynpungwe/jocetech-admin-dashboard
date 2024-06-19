import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'
import {
  clearFilters,
  updateFilters,
  filterProducs,
} from '../features/product/productSlice'

import styled from 'styled-components'

const Filters = () => {
  const dispatch = useDispatch()
  const {
    filters: { text, category, company, min_price, price, max_price },
    products,
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
          <section>
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
              <h5>category</h5>
              <div className="category-big-screen">
                {categories.map((c, index) => {
                  return (
                    <button
                      key={index}
                      onClick={filtersUpdate}
                      type="button"
                      name="category"
                      className={`${
                        category === c.toLowerCase() ? 'active' : null
                      }`}
                    >
                      {c}
                    </button>
                  )
                })}
              </div>
              <div className="category-small-screen ">
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
            {/* end of company */}
          </section>
          <section>
            {/* price */}
            <div className="form-control">
              <h5>price</h5>
              <p className="price">{formatPrice(price)}</p>
              <input
                type="range"
                name="price"
                onChange={filtersUpdate}
                min={min_price}
                max={max_price}
                value={price}
              />
            </div>
            {/* end of price */}
          </section>
        </form>
        <button
          type="button"
          className="clear-btn"
          onClick={() => dispatch(clearFilters())}
        >
          clear filters
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  form {
    display: flex;
    justify-content: space-between;
  }

  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
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
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }

  .category-big-screen {
    display: none;
  }
  .category-small-screen {
    display: block;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
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
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
    .category-big-screen {
      display: block;
    }
    .category-small-screen {
      display: none;
    }
    form {
      display: flex;
      flex-direction: column;
    }
  }
`

export default Filters
