import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import customeFetch from '../../utils/customeFetch'
import { toast } from 'react-toastify'

const initialState = {
  products_loading: false,
  products_error: false,
  products: [],
  filtered_products: [],
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
  },
}

export const getAllProducts = createAsyncThunk(
  'product/getAllProducts',
  async (_, thunkAPI) => {
    try {
      const { data } = await customeFetch.get('/products')

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

// export const getSingleProduct = createAsyncThunk(
//   'product/getSingleProducts',
//   async (id, thunkAPI) => {
//     try {
//       const { data } = await customeFetch.get(`/products/${id}`)

//       return data
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data.msg)
//     }
//   }
// )

// export const getSingleProductReview = createAsyncThunk(
//   'product/getSingleProductReview',
//   async (id, thunkAPI) => {
//     try {
//       const { page } = thunkAPI.getState().products
//       const { data } = await customeFetch.get(
//         `/products/review/${id}?page=${page}`
//       )
//       return data
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data.msg)
//     }
//   }
// )

const productSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    sortProduct: (state) => {
      const { sort, filtered_products } = state
      let tempProducts = []

      if (sort === 'price-lowest') {
        tempProducts = filtered_products.sort((a, b) => a.price - b.price)
      }
      if (sort === 'price-highest') {
        tempProducts = filtered_products.sort((a, b) => b.price - a.price)
      }
      if (sort === 'name-a') {
        tempProducts = filtered_products.sort((a, b) =>
          a.name.localeCompare(b.name)
        )
      }
      if (sort === 'name-z') {
        tempProducts = filtered_products.sort((a, b) =>
          b.name.localeCompare(a.name)
        )
      }

      state.filtered_products = tempProducts
    },
    updateSort: (state, { payload }) => {
      state.sort = payload
    },
    filterProducs: (state) => {
      const { products } = state
      const { text, category, company, price } = state.filters
      let tempProducts = [...products]
      if (text) {
        tempProducts = tempProducts.filter((product) =>
          product.name.toLowerCase().startsWith(text)
        )
      }
      if (category !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        )
      }
      if (company !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.company === company
        )
      }

      // filter by price
      tempProducts = tempProducts.filter((product) => product.price <= price)

      console.log(tempProducts)

      state.filtered_products = tempProducts
    },
    updateFilters: (state, { payload }) => {
      const { name, value } = payload
      state.filters[name] = value
    },
    clearFilters: (state) => {
      state.filters = {
        ...initialState.filters,
        price: state.filters.max_price,
        max_price: state.filters.max_price,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.products_loading = true
        state.products_error = false
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.products_loading = false
        state.products_error = false
        const { products } = payload
        let maxPrice = products.map((p) => p.price)
        maxPrice = Math.max(...maxPrice)
        state.products = products
        state.filtered_products = products
        state.filters.max_price = maxPrice
        state.filters.price = maxPrice
      })
      .addCase(getAllProducts.rejected, (state, { payload }) => {
        state.products_loading = false
        state.products_error = true
        toast.error(payload)
      })
  },
})

export const {
  sortProduct,
  filterProducs,
  updateFilters,
  updateSort,
  clearFilters,
} = productSlice.actions
export default productSlice.reducer
