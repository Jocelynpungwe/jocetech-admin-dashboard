import { useSelector, useDispatch } from 'react-redux'
import { getUniqueValues } from '../utils/helpers'
import {
  updateSort,
  sortProduct,
  updateFilters,
  filterProducs,
} from '../features/product/productSlice'

import styled from 'styled-components'
import FormSelect from './FormSelect'

const Filters = () => {
  const dispatch = useDispatch()
  const {
    filters: { text, category, company },
    products,
    sort,
    sortOptions,
  } = useSelector((store) => store.products)

  const categories = getUniqueValues(products, 'category')
  const companies = getUniqueValues(products, 'company')

  const filtersUpdate = (e) => {
    let name = e.target.name
    let value = e.target.value
    dispatch(updateFilters({ name, value }))
    dispatch(filterProducs())
  }

  const handleSort = (e) => {
    const value = e.target.value
    dispatch(updateSort(value))
    dispatch(sortProduct())
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
          <div className="form-control">
            {/* category */}

            <FormSelect
              name="category"
              labelText="category"
              value={category}
              handleChange={filtersUpdate}
              arrayOptions={categories}
            />
            {/* end of category */}
            {/* company */}
            <FormSelect
              name="company"
              labelText="company"
              value={company}
              handleChange={filtersUpdate}
              arrayOptions={companies}
            />
            {/* end of company */}
            {/* Sort */}
            <FormSelect
              name="sort"
              labelText="sort"
              value={sort}
              handleChange={handleSort}
              arrayOptions={sortOptions}
            />
            {/* end sort */}
          </div>
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
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

  @media (min-width: 768px) {
    .form-control {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-column-gap: 0.7rem;
    }
  }
`

export default Filters
