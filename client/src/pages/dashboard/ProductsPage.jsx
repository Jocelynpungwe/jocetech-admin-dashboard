import React from 'react'
import styled from 'styled-components'
import { ProductList, Filters, AddItems } from '../../components'
import { clearNewProduct } from '../../features/product/productSlice'

const ProductsPage = () => {
  return (
    <Wrapper>
      <AddItems
        name="All Products"
        label="Add Product"
        linkName="new-product"
        clear={clearNewProduct}
      />
      <div className="container">
        <Filters />
        <ProductList />
      </div>
      {/* ADD PAGINATION */}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .container {
    background-color: var(--white);
    padding: 1.5rem;
  }
`

export default ProductsPage
