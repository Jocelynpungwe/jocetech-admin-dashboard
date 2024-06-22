import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customeFetch from '../../utils/customeFetch'
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage'
import { clearFilters } from '../product/productSlice'

const initialState = {
  isLoading: false,
  isError: false,
  isSideBarOpen: false,
  allUser: [],
  singleUser: [],
  singleUserOrder: [],
  user: getUserFromLocalStorage(),
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    try {
      const { data } = await customeFetch.post('/auth/register', user)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const loginUser = createAsyncThunk(
  'user/login',
  async (user, thunkAPI) => {
    try {
      const { data } = await customeFetch.post('/auth/login', user)

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      const { data } = await customeFetch.get('/auth/logout')
      thunkAPI.dispatch(clearFilters())
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const getAllUser = createAsyncThunk(
  'user/getAllUser',
  async (_, thunkAPI) => {
    try {
      const { data } = await customeFetch.get('/user')
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const getSingleUser = createAsyncThunk(
  'user/getSingleUser',
  async (id, thunkAPI) => {
    try {
      const { data } = await customeFetch.get(`/user/${id}`)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const getSingleUserOrder = createAsyncThunk(
  'user/getSingleUserOrder',
  async (id, thunkAPI) => {
    try {
      const { data } = await customeFetch.get(`/orders/user/${id}`)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.isLoading = false
        state.user = user
        addUserToLocalStorage(user)
        toast.success(`Hello There ${user.name}`)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.isLoading = false
        state.user = user
        addUserToLocalStorage(user)
        toast.success(`Welcome Back ${user.name}`)
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.user = null
        state.isLoading = false
        state.isSideBarOpen = false
        removeUserFromLocalStorage()
        if (payload) {
          toast.success(payload)
        }
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(getAllUser.pending, (state, { payload }) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(getAllUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isError = false
        const { users } = payload
        state.allUser = users
      })
      .addCase(getAllUser.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        toast.error(payload)
      })
      .addCase(getSingleUser.pending, (state, { payload }) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(getSingleUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isError = false
        const { user } = payload
        console.log(user)
        state.singleUser = user
      })
      .addCase(getSingleUser.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        toast.error(payload)
      })
      .addCase(getSingleUserOrder.pending, (state, { payload }) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(getSingleUserOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isError = false
        const { order } = payload
        state.singleUserOrder = order
      })
      .addCase(getSingleUserOrder.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        toast.error(payload)
      })
  },
})

export const { toggleSideBar } = userSlice.actions
export default userSlice.reducer
