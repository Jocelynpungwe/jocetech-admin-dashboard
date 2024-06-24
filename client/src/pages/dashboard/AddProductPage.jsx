import { useState, useEffect } from 'react'
import { getUniqueValues } from '../utils/helpers'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { FormRow, PageTitle } from '../../components'
import {
  createProduct,
  updateProduct,
  handleChange,
  handleClick,
  uploadImage,
} from '../../features/product/productSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const AddProductPage = () => {
  const { new_products, products, isEdit } = useSelector(
    (store) => store.products
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log(new_products)
  console.log(isEdit)
  const catergoryOptions = getUniqueValues(products, 'category')
  const companyOptions = getUniqueValues(products, 'company')

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

    if (company === 'none' || category === 'none') {
      toast.error('Please provide company and category')
      return
    }

    if (!isEdit) {
      dispatch(createProduct(new_products))
      navigate('/products')
      return
    }

    dispatch(updateProduct({ id: new_products.id, product: new_products }))
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
        <div>
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
        </div>
        <div className="form-price-container">
          <div>
            <FormRow
              name="price"
              value={new_products.price}
              labelText="Price (CAD)"
              type="text"
              placeholder="Type here"
              inputMode="numeric"
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
          </div>
          <div>
            <p>The price unit is in cents.</p>
            <p> e.g 100 cents = 1 canadian dollars</p>
          </div>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Type here"
            onChange={(e) =>
              dispatch(
                handleChange({
                  name: e.target.name,
                  value: e.target.value,
                  type: e.target.type,
                })
              )
            }
            value={new_products.description}
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="image">Images</label>
          <div className="form-image-container">
            {new_products.image.length > 0 &&
              new_products.image.map((image, index) => {
                return <img key={index} src={image} alt="new product" />
              })}
          </div>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handlefileUpload}
            className="image-input"
            required
          />
        </div>
        <div>
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
        </div>
        <div>
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

        <div className="form-color-container">
          <label htmlFor="valueColor">Color</label>
          <div className="colors">
            {new_products.colors.map((c, index) => {
              return (
                <div
                  key={index}
                  style={{ backgroundColor: c }}
                  className="color-span"
                ></div>
              )
            })}
          </div>
          <input
            type="text"
            placeholder="#0000 or black"
            id="valueColor"
            name="valueColor"
            onChange={(e) =>
              dispatch(
                handleChange({
                  name: e.target.name,
                  value: e.target.value,
                  type: e.target.type,
                })
              )
            }
            value={new_products.valueColor}
          />
          <button
            type="button"
            className="secondary-btn"
            onClick={() => dispatch(handleClick())}
          >
            Add Color
          </button>
        </div>

        <div className="form-boolean-options-container">
          <div className="boolean-options-wrapper">
            <label htmlFor="freeShipping">Free Shipping</label>
            <input
              type="checkbox"
              id="freeShipping"
              name="freeShipping"
              value={new_products.freeShipping}
              onChange={(e) =>
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

          <div className="boolean-options-wrapper">
            <label htmlFor="featured">Featured</label>
            <input
              type="checkbox"
              id="featured"
              name="featured"
              value={new_products.featured}
              onChange={(e) =>
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
        </div>

        <div>
          <label htmlFor="inventory">Inventory</label>
          <input
            type="text"
            placeholder="Type here"
            inputMode="numeric"
            id="inventory"
            name="inventory"
            onChange={(e) =>
              dispatch(
                handleChange({
                  name: e.target.name,
                  value: e.target.value,
                  type: e.target.type,
                })
              )
            }
            value={new_products.inventory}
            className="number-input"
          />
        </div>

        <div>
          <label htmlFor="features">Features</label>
          <textarea
            id="features"
            name="features"
            onChange={(e) =>
              dispatch(
                handleChange({
                  name: e.target.name,
                  value: e.target.value,
                  type: e.target.type,
                })
              )
            }
            value={new_products.features}
            required
          ></textarea>
        </div>

        <div className="form-color-container">
          <label htmlFor="valueBox">Box</label>
          <div>
            {new_products.box.map((b, index) => {
              return <p key={index}>{b}</p>
            })}
          </div>
          <input
            type="text"
            id="valueBox"
            name="valueBox"
            onChange={(e) =>
              dispatch(
                handleChange({
                  name: e.target.name,
                  value: e.target.value,
                  type: e.target.type,
                })
              )
            }
            value={new_products.valueBox}
          />
          <button
            type="button"
            className="secondary-btn"
            onClick={() => dispatch(handleClick())}
          >
            Add To Box
          </button>
        </div>

        <button className="btn btn-block primary-btn">Add Product</button>
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

  input,
  select {
    width: 100%;
    padding: 19px 0 19px 24px;
    letter-spacing: -0.25px;
    opacity: 0.4;
    margin-bottom: 24px;
    border-radius: 6px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    font-size: 16px;
    background: var(--white);
    box-sizing: border-box;
  }

  textarea {
    resize: none;
    height: 150px;
    width: 100%;
    padding: 19px 0 19px 24px;
    letter-spacing: -0.25px;
    opacity: 0.4;
    margin-bottom: 24px;
    border-radius: 6px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    font-size: 16px;
    background: var(--white);
  }

  .image-input {
    height: 350px;
  }

  .number-input {
    width: 300px;
  }

  label {
    color: #000;
    font-family: Manrope;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.214px;
    margin-bottom: 9px;
  }

  .form-boolean-options-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
  }

  .boolean-options-wrapper {
    display: flex;
  }

  input[type='checkbox'] {
    accent-color: var(--primary-200);
  }

  input[type='checkbox']:checked::before {
    color: var(--primary-900);
  }

  .form-image-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;
    img {
      display: block;
      object-fit: cover;
      width: 100%;
      height: 100px;
    }
  }

  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }

  .form-price-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
  }

  .color-span {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }

  .add-property-btn {
    padding: 0.5rem 1rem;
  }

  .form-color-container {
    margin-bottom: 24px;
  }
`

export default AddProductPage
