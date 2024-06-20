import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import {
  getSingleProduct,
  toggleEdit,
  deleteProduct,
} from '../features/product/productSlice'
import { useDispatch } from 'react-redux'

const Product = ({ image, name, price, id }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <Wrapper>
      <div className="container">
        <img src={image[0]} alt={name} />
        <Link to={`/products/${id}`} className="link">
          <FaSearch />
        </Link>
      </div>
      <section>
        <h5>{name}</h5>
        <p>{formatPrice(price)}</p>
      </section>
      <footer>
        <button
          className="secondary-btn"
          onClick={() => {
            dispatch(toggleEdit({ id }))
            navigate('/new-product')
            dispatch(getSingleProduct(id))
          }}
        >
          <FaEdit />
          Edit
        </button>
        <button
          className="secondary-btn btn-danger"
          onClick={() => dispatch(deleteProduct(id))}
        >
          <FaTrash />
          Delete
        </button>
        {/* FIX BUTTON SIZES */}
      </footer>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  box-shadow: var(--shadow-4);
  border-radius: var(--radius);

  padding: 1rem;

  .container {
    position: relative;
    background: var(--clr-black);
    border-radius: var(--radius);
    width: 100%;
  }
  img {
    width: 100%;
    height: 200px;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--primary-chocolate);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--actual-black);
    }
  }
  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }

  h5,
  p {
    opacity: 0.5;
  }

  h5 {
    margin: 5px 0;
  }

  p {
    margin: 0 0 5px 0;
  }
  footer {
    margin-top: 1rem;
    display: flex;
    column-gap: 10px;
    align-items: center;
  }
`

export default Product
