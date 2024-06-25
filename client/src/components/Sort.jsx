import React from 'react'
import styled from 'styled-components'
import { sortOrder, updateSort } from '../features/order/orderSlice'
import { useSelector, useDispatch } from 'react-redux'
import OrderOptions from './OrderOptions'

const Sort = () => {
  const dispatch = useDispatch()
  const { sort } = useSelector((store) => store.order)

  const handleSortChange = (e) => {
    const value = e.target.value
    dispatch(updateSort(value))
    dispatch(sortOrder())
  }

  return (
    <Wrapper>
      <OrderOptions
        name="sort"
        labelText="sort"
        value={sort}
        handleChange={handleSortChange}
      />
    </Wrapper>
  )
}

const Wrapper = styled.section``

export default Sort
