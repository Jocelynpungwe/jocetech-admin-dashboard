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
    image: [],
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
  isEdit: false,
  editId: '',
  uploadLoading: false,
  uploadError: false,
  single_product_loading: false,
  single_product_error: false,
  single_product: [],
  single_product_review: [],
  single_product_review_loading: false,
  single_product_review_error: false,
  page: 1,
  numOfPages: 1,
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

export const getSingleProduct = createAsyncThunk(
  'product/getSingleProduct',
  async (id, thunkAPI) => {
    try {
      const { data } = await customeFetch.get(`/products/${id}`)

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const getSingleProductReview = createAsyncThunk(
  'product/getSingleProductReview',
  async (id, thunkAPI) => {
    try {
      const { data } = await customeFetch.get(`/products/review/${id}?page=1`)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (newProduct, thunkAPI) => {
    try {
      const { data } = await customeFetch.post('/products', newProduct)

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (newProduct, thunkAPI) => {
    const { id, product } = newProduct
    try {
      const { data } = await customeFetch.patch(`/products/${id}`, product)

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id, thunkAPI) => {
    try {
      const { data } = await customeFetch.delete(`/products/${id}`)

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
    toggleEdit: (state, { payload }) => {
      const { id } = payload
      state.isEdit = !state.isEdit
      state.editId = id
      console.log(id)
    },
    clearNewProduct: (state) => {
      state.new_products.name = initialState.new_products.name
      state.new_products.price = initialState.new_products.price
      state.new_products.description = initialState.new_products.description
      state.new_products.image = initialState.new_products.image
      state.new_products.category = initialState.new_products.category
      state.new_products.company = initialState.new_products.company
      state.new_products.colors = initialState.new_products.colors
      state.new_products.freeShipping = initialState.new_products.freeShipping
      state.new_products.featured = initialState.new_products.featured
      state.new_products.inventory = initialState.new_products.inventory
      state.new_products.features = initialState.new_products.features
      state.new_products.box = initialState.new_products.box
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
        let tempImageArray = [...state.new_products.image, image]
        state.new_products.image = tempImageArray
      })
      .addCase(uploadImage.rejected, (state, { payload }) => {
        state.uploadLoading = false
        state.uploadError = true
        toast.error(payload)
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.single_product_loading = true
        state.single_product_error = false
      })
      .addCase(getSingleProduct.fulfilled, (state, { payload }) => {
        state.single_product_loading = false
        state.single_product_error = false
        const { product } = payload

        state.single_product = product
        state.page = 1
        state.new_products.name = product.name
        state.new_products.price = product.price
        state.new_products.description = product.description
        state.new_products.image = product.image
        state.new_products.category = product.category
        state.new_products.company = product.company
        state.new_products.colors = product.colors
        state.new_products.freeShipping = product.freeShipping
        state.new_products.featured = product.featured
        state.new_products.inventory = product.inventory
        state.new_products.features = product.features
        state.new_products.box = product.box
      })
      .addCase(getSingleProduct.rejected, (state, { payload }) => {
        state.single_product_loading = false
        state.single_product_error = true
        toast.error(payload)
      })
      .addCase(getSingleProductReview.pending, (state) => {
        state.single_product_review_loading = true
        state.single_product_review_error = false
      })
      .addCase(getSingleProductReview.fulfilled, (state, { payload }) => {
        const { reviews, numOfPages } = payload
        state.single_product_review_loading = false
        state.single_product_review_error = false
        state.single_product_review = reviews
        state.numOfPages = numOfPages
      })
      .addCase(getSingleProductReview.rejected, (state, { payload }) => {
        state.single_product_review_loading = false
        state.single_product_review_error = true
        toast.error(payload)
      })
      .addCase(createProduct.pending, (state) => {
        state.single_product_loading = true
        state.single_product_error = false
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.single_product_loading = false
        state.single_product_error = false
        const { product } = payload
        state.single_product = product
        toast.success('New Product Created')
      })
      .addCase(createProduct.rejected, (state, { payload }) => {
        state.single_product_loading = false
        state.single_product_error = true
        toast.error(payload)
      })
      .addCase(updateProduct.pending, (state) => {
        state.single_product_loading = true
        state.single_product_error = false
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.single_product_loading = false
        state.single_product_error = false
        const { product } = payload
        state.single_product = product
        toast.success('Product Edited Successfully')
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.single_product_loading = false
        state.single_product_error = true
        toast.error(payload)
      })
      .addCase(deleteProduct.pending, (state) => {
        state.single_product_loading = true
        state.single_product_error = false
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.single_product_loading = false
        state.single_product_error = false
        const { msg } = payload
        state.single_product = []
        toast.success(msg)
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        state.single_product_loading = false
        state.single_product_error = true
        toast.error(payload)
      })
  },
})

export const {
  handleChange,
  handleClick,
  toggleEdit,
  clearNewProduct,
  sortProduct,
  filterProducs,
  updateFilters,
  updateSort,
  clearFilters,
} = productSlice.actions
export default productSlice.reducer
