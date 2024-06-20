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
  },
  new_products: {
    name: '',
    price: 0,
    images: [],
    colors: ['#222', '#0000'],
    valueColor: '',
    description: '',
    category: 'none',
    company: 'none',
    freeShipping: false,
    featured: false,
    inventory: 0,
    features:
      'Computers, game consoles, headphones, laptops, speakers, and phones share several common features that enhance functionality and connectivity. These include various connectivity options like Bluetooth, Wi-Fi, USB ports, and 3.5mm audio jacks. They all possess audio capabilities such as built-in speakers and microphones, and processing power through CPUs, GPUs, and RAM for multitasking and performance. Display and graphics support, user interfaces with operating systems, and touch controls are prevalent. Portability is ensured with battery power and lightweight designs. Internal and expandable storage, smart features like voice assistants, and app ecosystems enhance user experience. Network capabilities for internet access and streaming, along with inter-device synchronization and peripheral support, further integrate these devices into a cohesive technological ecosystem.',
    box: [
      '1x Device Unit',
      '1x User Manual',
      '1x Documenation Warranty',
      '1x USB Cable',
      '1x Travel Bag',
    ],
    valueBox: '',
  },
  uploadLoading: false,
  uploadError: false,
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

export const uploadImage = createAsyncThunk(
  'product/upload',
  async (image, thunkAPI) => {
    try {
      const { data } = await customeFetch.post('/products/uploadImage', image, {
        Headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const productSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      const { name, value, type, checked } = payload

      if (type === 'text') {
        if (name === 'price' || name === 'inventory') {
          if (Number(value)) {
            state.new_products[name] = Number(value)
          }
        } else {
          state.new_products[name] = value
        }
      }

      if (type === 'checkbox') {
        state.new_products[name] = checked
      }

      if (type === 'textarea' || type === 'select-one') {
        state.new_products[name] = value
      }
    },
    handleClick: (state) => {
      const { new_products } = state
      const { valueBox, valueColor, box, colors } = new_products

      if (valueBox) {
        const newBox = [...box, valueBox]
        state.new_products.box = newBox
        state.new_products.valueBox = ''
      }

      if (valueColor) {
        const newColors = [...colors, valueColor]
        state.new_products.colors = newColors
        state.new_products.valueColor = ''
      }
    },
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
      const { text, category, company } = state.filters
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
        state.products = products
        state.filtered_products = products
      })
      .addCase(getAllProducts.rejected, (state, { payload }) => {
        state.products_loading = false
        state.products_error = true
        toast.error(payload)
      })
      .addCase(uploadImage.pending, (state, { payload }) => {
        state.uploadLoading = true
        state.uploadError = false
      })
      .addCase(uploadImage.fulfilled, (state, { payload }) => {
        const { image } = payload
        state.uploadLoading = false
        state.uploadError = false
        let tempImageArray = [...state.new_products.images, image]
        console.log(tempImageArray)
        state.new_products.images = tempImageArray
      })
      .addCase(uploadImage.rejected, (state, { payload }) => {
        state.uploadLoading = false
        state.uploadError = true
        toast.error(payload)
      })
  },
})

export const {
  handleChange,
  handleClick,
  sortProduct,
  filterProducs,
  updateFilters,
  updateSort,
  clearFilters,
} = productSlice.actions
export default productSlice.reducer
