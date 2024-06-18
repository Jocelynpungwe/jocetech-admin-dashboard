import { useEffect } from 'react'
import {
  StatsContainer,
  Loading,
  ChartsContainer,
  LatestOrder,
} from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser } from '../../features/user/userSlice'
import { getAllProducts } from '../../features/product/productSlice'
import { getAllOrders, getOrderStats } from '../../features/order/orderSlice'

const MainDashboard = () => {
  const dispatch = useDispatch()
  const { products } = useSelector((store) => store.products)
  const { allOrders, total_sale } = useSelector((store) => store.order)

  useEffect(() => {
    dispatch(getOrderStats())
    dispatch(getAllOrders())
    dispatch(getAllProducts())
  }, [])

  return (
    <>
      <StatsContainer
        productsStat={products.length}
        totalSale={total_sale}
        orderStat={allOrders.length}
      />
      <ChartsContainer />
      <LatestOrder orders={allOrders} />
    </>
  )
}

export default MainDashboard
