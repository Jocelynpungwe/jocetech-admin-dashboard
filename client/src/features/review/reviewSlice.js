import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import customeFetch from '../../utils/customeFetch'

import { toast } from 'react-toastify'
import { logoutUser } from '../user/userSlice'

const initialState = {
  allReviews: [],
  isLoading: false,
  isError: false,
  singleReview: null,
  singleUserReviews: [],
  isUserReviewLoading: false,
  isUserReviewError: false,
  text: '',
  searchReview: [],
  page: 1,
  numOfPages: 1,
}

export const getAllReviews = createAsyncThunk(
  'review/getAllReviews',
  async (_, thunkAPI) => {
    try {
      const { page } = thunkAPI.getState().review
      const { data } = await customeFetch.get(`/reviews?page=${page}`)
      return data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser('Authentication Invalid'))
      }

      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const getSingleReview = createAsyncThunk(
  'review/getSingleReview',
  async (id, thunkAPI) => {
    try {
      const { data } = await customeFetch.get(`/reviews/${id}`)
      return data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser('Authentication Invalid'))
      }

      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const getSingleUserReview = createAsyncThunk(
  'review/getSingleUserReview',
  async (id, thunkAPI) => {
    try {
      const { data } = await customeFetch.get(`/reviews/user/${id}`)
      return data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser('Authentication Invalid'))
      }

      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    filtersUpdate: (state, { payload }) => {
      state.text = payload
      state.searchReview = state.allReviews.filter((review) =>
        review.product.name.toLowerCase().startsWith(state.text)
      )
    },
    changePageReview: (state, { payload }) => {
      state.page = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllReviews.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(getAllReviews.fulfilled, (state, { payload }) => {
        const { reviews, numOfPages } = payload
        state.isLoading = false
        state.isError = false
        state.allReviews = reviews
        state.searchReview = reviews
        state.numOfPages = numOfPages
      })
      .addCase(getAllReviews.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        toast.error(payload)
      })
      .addCase(getSingleReview.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(getSingleReview.fulfilled, (state, { payload }) => {
        const { review } = payload
        state.isLoading = false
        state.isError = false
        state.singleReview = review
      })
      .addCase(getSingleReview.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        toast.error(payload)
      })
      .addCase(getSingleUserReview.pending, (state) => {
        state.isUserReviewLoading = true
        state.isUserReviewError = false
      })
      .addCase(getSingleUserReview.fulfilled, (state, { payload }) => {
        const { reviews } = payload

        state.isUserReviewLoading = false
        state.isUserReviewError = false
        state.singleUserReviews = reviews
      })
      .addCase(getSingleUserReview.rejected, (state, { payload }) => {
        state.isUserReviewLoading = false
        state.isUserReviewError = true
        toast.error(payload)
      })
  },
})

export const { filtersUpdate, changePageReview } = reviewSlice.actions
export default reviewSlice.reducer
