import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Product = ({ image, name, price, id }) => {
  return (
    <Wrapper>
      <img src={image[0]} alt={name} />
      <section>
        <h5>{name}</h5>
        <p>{formatPrice(price)}</p>
      </section>
      <footer>
        <Link className="secondary-btn">
          <FaEdit />
          Edit
        </Link>
        <button className="secondary-btn btn-danger">
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

  img {
    width: 100%;
    height: 175px;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
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
