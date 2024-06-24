import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import {
  getSingleProduct,
  toggleEdit,
  deleteProduct,
} from '../features/product/productSlice'
import { useDispatch } from 'react-redux'
import ProductInfo from './ProductInfo'
import EditAndDelete from './EditAndDelete'

const Product = ({ image, name, price, id, colors }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = () => {
    dispatch(toggleEdit({ id }))
    navigate('/new-product')
    dispatch(getSingleProduct(id))
  }

  return (
    <Wrapper>
      <ProductInfo
        image={image}
        name={name}
        id={id}
        price={price}
        colors={colors}
      />
      <EditAndDelete
        handleClickEdit={handleClick}
        handleClickDelete={() => dispatch(deleteProduct(id))}
      />
    </Wrapper>
  )
}

const Wrapper = styled.article`
  box-shadow: var(--shadow-3);
  border-radius: var(--radius);
  padding: 1rem;
`

export default Product
