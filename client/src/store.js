import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import productSlice from './features/product/productSlice'
import orderSlice from './features/order/orderSlice'
import reviewSlice from './features/review/reviewSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    products: productSlice,
    order: orderSlice,
    review: reviewSlice,
  },
})

export default store
