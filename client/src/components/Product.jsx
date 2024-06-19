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
        <Link>
          <FaEdit />
          Edit
        </Link>
        <button>
          <FaTrash />
          Delete
        </button>
      </footer>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  img {
    width: 100%;
    height: 175px;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    font-weight: 400;
  }

  footer p {
    color: var(--secondy-chocolate);
    letter-spacing: var(--spacing);
  }
`

export default Product
