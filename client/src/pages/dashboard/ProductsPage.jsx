import { useEffect } from 'react'
import styled from 'styled-components'
import {
  ProductList,
  Filters,
  PageTitle,
  Loading,
  Error,
} from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../../features/product/productSlice'

const ProductsPage = () => {
  const dispatch = useDispatch()
  const {
    filtered_products: products,
    products_loading: loading,
    products_error: error,
  } = useSelector((store) => store.products)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  return (
    <Wrapper>
      <PageTitle
        name="All Products"
        label="Add Product"
        linkName="new-product"
        page="product-page"
      />
      <div className="wrapper-container">
        <Filters />
        {products.length < 1 ? (
          <h5 style={{ textTransform: 'none', marginTop: '1rem' }}>
            Sorry, no products matched your search.
          </h5>
        ) : (
          <ProductList />
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default ProductsPage
