import { useEffect } from 'react'
import {
  StatsContainer,
  ChartsContainer,
  LatestOrder,
  Loading,
  Error,
} from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../features/product/productSlice'
import { getAllOrders, getOrderStats } from '../../features/order/orderSlice'

const MainDashboard = () => {
  const dispatch = useDispatch()
  const { products, products_loading, products_error } = useSelector(
    (store) => store.products
  )
  const { allOrders, total_sale, orderLoading, orderError } = useSelector(
    (store) => store.order
  )

  useEffect(() => {
    dispatch(getOrderStats())
    dispatch(getAllOrders())
    dispatch(getAllProducts())
  }, [])

  return (
    <>
      {products_loading || orderLoading ? (
        <Loading />
      ) : products_error || orderError ? (
        <Error />
      ) : (
        <StatsContainer
          productsStat={products.length}
          totalSale={total_sale}
          orderStat={allOrders.length}
        />
      )}
      <ChartsContainer />
      {orderLoading ? (
        <Loading />
      ) : orderError ? (
        <Error />
      ) : (
        <LatestOrder orders={allOrders} />
      )}
    </>
  )
}

export default MainDashboard
