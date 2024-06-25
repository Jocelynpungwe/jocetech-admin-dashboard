import { useState, useEffect } from 'react'
import { getUniqueValues } from '../../utils/helpers'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import {
  FormRow,
  FormRowDisplay,
  FormTextArea,
  PageTitle,
  FormSelect,
} from '../../components'
import {
  createProduct,
  updateProduct,
  handleChange,
  handleClick,
  uploadImage,
  getAllProducts,
  clearNewProduct,
} from '../../features/product/productSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AddProductPage = () => {
  const { new_products, products, isEdit, editId, isLoading } = useSelector(
    (store) => store.products
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log(new_products)

  const catergoryOptions = getUniqueValues(products, 'category')
  const companyOptions = getUniqueValues(products, 'company')

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const { price, inventory, company, category } = new_products

    if (!price || !inventory) {
      toast.error(
        `Please provide ${
          !price ? 'price' : !inventory ? 'inventory' : 'all fields'
        }`
      )
      return
    }

    if (company === 'all' || category === 'all') {
      toast.error('Please provide company and category')
      return
    }

    if (!isEdit) {
      dispatch(createProduct(new_products))
      navigate('/products')
      return
    }

    dispatch(updateProduct({ id: editId, product: new_products }))
    dispatch(clearNewProduct())
    navigate(`/products/${editId}`)
  }

  const handlefileUpload = (e) => {
    const imageFile = e.target.files[0]
    const formData = new FormData()
    formData.append('images', imageFile)
    dispatch(uploadImage(formData))
  }

  return (
    <Wrapper>
      <PageTitle
        name="Create Product"
        label="Back To Product"
        linkName="products"
        page="add-product-page"
      />
      <form onSubmit={handleSubmit}>
        <FormRow
          name="name"
          value={new_products.name}
          labelText="Product Name"
          type="text"
          placeholder="Type here"
          required
          handleChange={(e) =>
            dispatch(
              handleChange({
                name: e.target.name,
                value: e.target.value,
                type: e.target.type,
              })
            )
          }
        />
        <FormRowDisplay
          name="image"
          lebelText="Image"
          type="file"
          handleChange={handlefileUpload}
          imageArray={new_products.image}
        />
        <div className="form-price-container">
          <FormRow
            name="price"
            value={new_products.price}
            labelText="Price (CAD)"
            type="text"
            placeholder="100"
            required
            handleChange={(e) =>
              dispatch(
                handleChange({
                  name: e.target.name,
                  value: e.target.value,
                  type: e.target.type,
                })
              )
            }
          />

          <div className="price-info">
            <p>The price unit is in cents.</p>
            <p> e.g 100 cents = 1 canadian dollars</p>
          </div>
        </div>
        <FormRowDisplay
          name="valueColor"
          labelText="Color"
          type="text"
          placeholder="#0000 or black"
          handleChange={(e) =>
            dispatch(
              handleChange({
                name: e.target.name,
                value: e.target.value,
                type: e.target.type,
              })
            )
          }
          imageArray={new_products.colors}
          handleSubmit={() => dispatch(handleClick())}
          btnText=" Add Color"
        />
        <FormRow
          name="inventory"
          value={new_products.inventory}
          type="text"
          placeholder="15"
          required
          handleChange={(e) =>
            dispatch(
              handleChange({
                name: e.target.name,
                value: e.target.value,
                type: e.target.type,
                checked: e.target.checked,
              })
            )
          }
        />
        <FormTextArea
          name="description"
          labelText="Description"
          value={new_products.description}
          handleChange={(e) =>
            dispatch(
              handleChange({
                name: e.target.name,
                value: e.target.value,
                type: e.target.type,
              })
            )
          }
        />
        <div className="form-control">
          <FormSelect
            name="category"
            lebelText="category"
            value={new_products.category}
            handleChange={(e) =>
              dispatch(
                handleChange({
                  name: e.target.name,
                  value: e.target.value,
                  type: e.target.type,
                })
              )
            }
            arrayOptions={catergoryOptions}
            required
          />
          <FormSelect
            name="company"
            lebelText="company"
            value={new_products.company}
            handleChange={(e) =>
              dispatch(
                handleChange({
                  name: e.target.name,
                  value: e.target.value,
                  type: e.target.type,
                })
              )
            }
            arrayOptions={companyOptions}
            required
          />
        </div>
        <FormRowDisplay
          name="valueBox"
          labelText="Box"
          type="text"
          placeholder="Type here"
          handleChange={(e) =>
            dispatch(
              handleChange({
                name: e.target.name,
                value: e.target.value,
                type: e.target.type,
              })
            )
          }
          imageArray={new_products.box}
          handleSubmit={() => dispatch(handleClick())}
          btnText="Add To Box"
        />
        <div className="form-control">
          <FormRow
            name="freeShipping"
            value={new_products.freeShipping}
            labelText="Free Shipping"
            type="checkbox"
            required
            handleChange={(e) =>
              dispatch(
                handleChange({
                  name: e.target.name,
                  value: e.target.value,
                  type: e.target.type,
                  checked: e.target.checked,
                })
              )
            }
          />
          <FormRow
            name="featured"
            value={new_products.featured}
            labelText="featured"
            type="checkbox"
            required
            handleChange={(e) =>
              dispatch(
                handleChange({
                  name: e.target.name,
                  value: e.target.value,
                  type: e.target.type,
                  checked: e.target.checked,
                })
              )
            }
          />
        </div>
        <div>
          <FormTextArea
            name="features"
            labelText="Features"
            value={new_products.features}
            handleChange={(e) =>
              dispatch(
                handleChange({
                  name: e.target.name,
                  value: e.target.value,
                  type: e.target.type,
                })
              )
            }
          />
        </div>
        <button className="btn btn-block" disabled={isLoading}>
          {isLoading ? 'loading...' : 'Add Product'}
        </button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  form {
    padding: 2rem;
    background-color: var(--white);
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
  }

  .form-price-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
  }

  .price-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      margin: 0;
    }
  }

  @media (min-width: 768px) {
    .form-control {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 0.7rem;
    }
  }
`

export default AddProductPage
