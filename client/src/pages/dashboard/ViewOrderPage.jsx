import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleOrders } from '../../features/order/orderSlice'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { formatPrice } from '../../utils/helpers'
import { Loading, Error } from '../../components'

const ViewOrderPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSingleOrders(id))
  }, [id])

  const {
    singleOrder,
    orderLoading: loading,
    orderError: error,
  } = useSelector((store) => store.order)

  console.log(singleOrder)

  if (loading || !singleOrder) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  const {
    orderItems,
    shippingAddress,
    status,
    shippingFee,
    tax,
    subtotal,
    total,
    createdAt,
    updatedAt,
  } = singleOrder

  return (
    <Wrapper>
      <h3>View Single Order</h3>
      <section>
        {orderItems.map((order, index) => {
          const { image, name, amount, price, color } = order
          return (
            <div key={index}>
              <img src={image[0]} alt={name} />
              <h3>{name}</h3>
              <div>
                <p> color :</p>
                <div
                  style={{
                    backgroundColor: color,
                    width: '1rem',
                    height: '1rem',
                  }}
                ></div>
              </div>
              <p>Amount :{amount}</p>
              <p>Price :{formatPrice(price)}</p>
            </div>
          )
        })}
      </section>
      <section>
        <div>
          <h3>Shipping Address</h3>
          <p>User Name: {shippingAddress.name}</p>
          <p>User Email: {shippingAddress.email}</p>
          <p>Street: {shippingAddress.line1}</p>
          <p>City: {shippingAddress.city}</p>
          <p>Postal Code: {shippingAddress.postal_code}</p>
          <p>State: {shippingAddress.state}</p>
          <p>Country: Canada</p>
        </div>
        <div>
          <h3>Billing Info</h3>
          <p>Shipping: {formatPrice(shippingFee)}</p>
          <p>Tax: {tax}</p>
          <p>Subtotal: {subtotal}</p>
          <div>
            <p>Order Placed Date: {createdAt}</p>
            <span>Total: {total}</span>
            <span>Status: {status}</span>
            <p>Order Updated Date: {updatedAt}</p>
          </div>
        </div>
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  img {
    object-fit: cover;
    width: 100%;
    height: 170px;
  }
`

export default ViewOrderPage
