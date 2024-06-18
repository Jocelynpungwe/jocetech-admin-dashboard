import React from 'react'
import styled from 'styled-components'

const Logo = () => {
  return (
    <Wrapper>
      <span>JocesTech</span> Solution
    </Wrapper>
  )
}

const Wrapper = styled.h3`
  margin-bottom: 0;
  color: var(--primary-blackish);
  span {
    color: var(--primary-chocolate);
  }
`

export default Logo
