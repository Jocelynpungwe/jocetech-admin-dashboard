import { useEffect } from 'react'
import { LatestOrder, Sort } from '../../components'
import { useDispatch, useSelector } from 'react-redux'

import { getAllOrders } from '../../features/order/orderSlice'

const OrderPage = () => {
  const dispatch = useDispatch()
  const { sortAllOrders } = useSelector((store) => store.order)

  useEffect(() => {
    dispatch(getAllOrders())
  }, [])

  return (
    <>
      <Sort />
      <LatestOrder orders={sortAllOrders} page="order-page" />
    </>
  )
}

export default OrderPage
