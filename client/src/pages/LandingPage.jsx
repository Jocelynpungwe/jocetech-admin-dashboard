import React from 'react'
import main from '../assets/images/main.svg'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const LandingPage = () => {
  return (
    <Wrapper>
      <div className="container page">
        <div className="info">
          <h1>
            JocesTech <span>Solution</span> Admin
          </h1>
          <p>
            The Jocetech Solution Admin App is an essential tool for managing
            the intricate operations of an e-commerce business. With its
            powerful features and user-friendly interface, it empowers
            administrators to efficiently oversee product management, order
            processing, customer relations, and sales analytics, ultimately
            enhancing the overall performance and success of Jocetech Solution.
          </p>
          <Link to="/login" className="btn secondary-btn">
            Login
          </Link>
        </div>
        <img src={main} alt="admin jocetech" className="img main-img" />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    color: var(--primary-900);
    span {
      color: var(--black);
    }
  }
  p {
    color: var(--black);
    opacity: 0.6;
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`

export default LandingPage
