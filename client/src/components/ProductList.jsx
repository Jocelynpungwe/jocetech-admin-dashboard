import { useEffect } from 'react'
import GridView from './GridView'
import { useSelector, useDispatch } from 'react-redux'
import Loading from './Loading'
import Error from './Error'
import { getAllProducts } from '../features/product/productSlice'

const ProductList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  const {
    filtered_products: products,
    products_loading: loading,
    products_error: error,
  } = useSelector((store) => store.products)

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search.
      </h5>
    )
  }

  return (
    <>
      <GridView products={products} />
    </>
  )
}

export default ProductList
