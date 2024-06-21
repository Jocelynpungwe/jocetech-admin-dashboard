import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const ProductInfo = ({ image, name, price, id, amount, color }) => {
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
        {amount && <p>Amount: {amount}</p>}
        {color && (
          <div style={{ backgroundColor: color }} className="color-span">
            1
          </div>
        )}
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.article`
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

  .color-span {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
`

export default ProductInfo
