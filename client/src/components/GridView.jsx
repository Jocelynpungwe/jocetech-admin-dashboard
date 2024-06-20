import React from 'react'
import styled from 'styled-components'
import Product from './Product'

const GridView = ({ products }) => {
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
  grid-column: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  }

  @media (min-width: 990px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

export default GridView
