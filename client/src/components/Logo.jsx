import React from 'react'
import styled from 'styled-components'

const Logo = () => {
  return (
    <Wrapper>
      <div className="letter-container">
        <span>J</span>
      </div>
      <div className="logo-hide">
        <h3>
          <span className="info-admin">Admin</span>
        </h3>
        <h3>
          <span>JocesTech</span>
        </h3>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;

  .letter-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-900);
    width: 50px;
    height: 50px;
    border-radius: var(--borderRadius);
    color: var(--white);
    font-size: 1.5rem;
    margin-right: 10px;
  }

  h3 {
    font-size: 1rem;
    margin: 0;
    color: var(--black);
    span {
      color: var(--primary-900);
    }
  }

  .info-admin {
    font-size: 1.5rem;
    font-weight: 700;
  }

  @media (max-width: 550px) {
    .logo-hide {
      display: none;
    }
  }
`

export default Logo
