import React from 'react'
import styled from 'styled-components'
import Product from './Product'
import { useSelector } from 'react-redux'

const ProductList = () => {
  const { filtered_products: products } = useSelector((store) => store.products)
  console.log(products)
  return (
    <Wrapper>
      {products.map((product) => {
        return <Product key={product.id} {...product} />
      })}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  margin-top: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  }

  @media (min-width: 990px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

export default ProductList
