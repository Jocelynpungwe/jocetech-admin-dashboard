import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import customeFetch from '../../utils/customeFetch'
import { toast } from 'react-toastify'
import { logoutUser } from '../user/userSlice'

const initialState = {
  allOrders: [],
  orderLoading: false,
  orderError: false,
  sortAllOrders: [],
  status: 'pending',
  sort: 'all',
  sortOptions: [
    { Label: 'all', value: 'all' },
    { Label: 'paid', value: 'paid' },
    { Label: 'pending', value: 'pending' },
    { Label: 'delivered', value: 'delivered' },
    { Label: 'failed', value: 'failed' },
    { Label: 'canceled', value: 'canceled' },
  ],

  singleOrder: null,

  orderState: [],
  monthlyOrder: [],
  mustOrderStats: [],
  total_sale: 0,

  order: {},
  clientSecret: null,
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
        thunkAPI.dispatch(logoutUser('Authentication Invalid'))
      }
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const completeOrder = createAsyncThunk(
  'order/completeOrder',
  async (updateStatus, thunkAPI) => {
    const { id, status } = updateStatus
    try {
      const { data } = await customeFetch.patch(`/orders/complete/${id}`, {
        status,
      })
      thunkAPI.dispatch(getAllOrders())
      return data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser('Authentication Invalid'))
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
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser('Authentication Invalid'))
      }

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
    updateStatus: (state, { payload }) => {
      state.status = payload
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
        state.sortAllOrders = orders.sort((a, b) => b.updatedAt - a.updatedAt)
      })
      .addCase(getAllOrders.rejected, (state, { payload }) => {
        state.orderLoading = false
        state.orderError = true
        toast.error(payload)
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
        toast.error(payload)
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
        state.status = order.status
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
      .addCase(completeOrder.pending, (state) => {
        state.orderLoading = true
        state.orderError = false
      })
      .addCase(completeOrder.fulfilled, (state, { payload }) => {
        const { order } = payload
        state.orderLoading = false
        state.orderError = false
        state.singleOrder = order
      })
      .addCase(completeOrder.rejected, (state, { payload }) => {
        state.orderLoading = false
        state.orderError = true
        toast.error(payload)
      })
  },
})

export const { sortOrder, updateSort, updateStatus, toggleAddress, totalSale } =
  orderSlice.actions
export default orderSlice.reducer
