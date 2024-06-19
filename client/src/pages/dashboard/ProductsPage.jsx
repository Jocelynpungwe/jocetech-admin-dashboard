import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ProductList, Sort, Filters, AddItems } from '../../components'

const ProductsPage = () => {
  return (
    <Wrapper>
      <AddItems
        name="All Products"
        label="Add Product"
        linkName="new-product"
      />
      <div>
        <Filters />
        <div>
          <Sort />
          <ProductList />
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default ProductsPage
