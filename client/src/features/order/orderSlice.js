import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import customeFetch from '../../utils/customeFetch'
import { toast } from 'react-toastify'
import { logoutUser } from '../user/userSlice'
const initialBilling = {
  address: {
    line1: '',
    city: '',
    state: '',
    postal_code: '',
  },
}

const initialState = {
  allOrders: [],
  singleOrder: null,
  sortAllOrders: [],
  sort: 'all',
  orderState: [],
  monthlyOrder: [],
  mustOrderStats: [],
  total_sale: 0,

  orderLoading: false,
  orderError: false,
  order: {},
  clientSecret: null,
  ...initialBilling,
}

export const getAllOrders = createAsyncThunk(
  'order/getAllOrders',
  async (_, thunkAPI) => {
    try {
      const { data } = await customeFetch.get('/orders')
      thunkAPI.dispatch(totalSale(data))
      return data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser())
      }
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const getOrderStats = createAsyncThunk(
  'order/getOrderStats',
  async (_, thunkAPI) => {
    try {
      const { data } = await customeFetch.get('/orders/showOrderStat')
      return data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser('Authentication Invalid'))
      }

      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const getSingleOrders = createAsyncThunk(
  'order/getSingleOrders',
  async (id, thunkAPI) => {
    try {
      const { data } = await customeFetch.get(`/orders/${id}`)

      return data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser())
      }
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const updateOrder = createAsyncThunk(
  'order/update',
  async (item, thunkAPI) => {
    try {
      const { order, address, paymentIntentId } = item

      const { data } = await customeFetch.patch(`/orders/${order.orderId}`, {
        paymentIntentId,
        address,
      })

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const orderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    sortOrder: (state) => {
      const { sort, allOrders } = state
      let tempOrders = []

      if (sort === 'all') {
        state.sortAllOrders = allOrders
      } else {
        tempOrders = allOrders
        state.sortAllOrders = tempOrders.filter(
          (order) => order.status === sort
        )
      }
    },
    updateSort: (state, { payload }) => {
      state.sort = payload
    },
    toggleAddress: (state, { payload }) => {
      const { value, name } = payload
      state.address[name] = value
    },
    totalSale: (state, { payload }) => {
      const filteredSale = payload.orders.filter(
        (sale) => sale.status === 'paid'
      )

      state.total_sale = filteredSale.reduce((acc, current) => {
        return acc + current.total
      }, 0)
    },
    clearOrder: (state) => {
      state.address.line1 = initialBilling.address.line1
      state.address.city = initialBilling.address.city
      state.address.state = initialBilling.address.state
      state.address.postal_code = initialBilling.address.postal_code
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.orderLoading = true
        state.orderError = false
      })
      .addCase(getAllOrders.fulfilled, (state, { payload }) => {
        const { orders } = payload
        state.orderLoading = false
        state.orderError = false
        state.allOrders = orders
        state.sortAllOrders = orders
      })
      .addCase(getAllOrders.rejected, (state, { payload }) => {
        state.orderLoading = false
        state.orderError = true
      })
      .addCase(getOrderStats.pending, (state) => {
        state.orderLoading = true
        state.orderError = false
      })
      .addCase(getOrderStats.fulfilled, (state, { payload }) => {
        const { orderState, monthlyOrder, mustOrderStats } = payload
        state.orderLoading = false
        state.orderError = false
        state.orderState = orderState
        state.monthlyOrder = monthlyOrder
        state.mustOrderStats = mustOrderStats
      })
      .addCase(getOrderStats.rejected, (state, { payload }) => {
        state.orderLoading = false
        state.orderError = true
      })
      .addCase(getSingleOrders.pending, (state, { payload }) => {
        state.orderLoading = true
        state.orderError = false
      })
      .addCase(getSingleOrders.fulfilled, (state, { payload }) => {
        const { order } = payload
        state.orderLoading = false
        state.orderError = false
        state.singleOrder = order
      })
      .addCase(getSingleOrders.rejected, (state, { payload }) => {
        state.orderLoading = false
        state.orderError = true
        toast.error(payload)
      })
      .addCase(updateOrder.pending, (state, { payload }) => {
        state.orderLoading = true
        state.orderError = false
      })
      .addCase(updateOrder.fulfilled, (state, { payload }) => {
        state.orderLoading = false
        state.orderError = false
      })
      .addCase(updateOrder.rejected, (state, { payload }) => {
        state.orderLoading = false
        state.orderError = true
        toast.error(payload)
      })
  },
})

export const { sortOrder, updateSort, toggleAddress, totalSale, clearOrder } =
  orderSlice.actions
export default orderSlice.reducer
