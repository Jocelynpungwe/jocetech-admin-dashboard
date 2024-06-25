import { useEffect } from 'react'
import { Error, LatestOrder, Loading, Sort } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getAllOrders } from '../../features/order/orderSlice'

const OrderPage = () => {
  const dispatch = useDispatch()
  const {
    sortAllOrders,
    orderLoading: loading,
    orderError: error,
  } = useSelector((store) => store.order)

  useEffect(() => {
    dispatch(getAllOrders())
  }, [])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <Wrapper>
      <div className="wrapper-container">
        <h3 className="title">View All Orders</h3>
        <Sort />
      </div>
      <LatestOrder orders={sortAllOrders} page="order-page" />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .wrapper-container {
    padding: 1rem 2rem;
    margin-bottom: 1rem;
    .title {
      margin-bottom: 0.5rem;
    }
  }
`

export default OrderPage
