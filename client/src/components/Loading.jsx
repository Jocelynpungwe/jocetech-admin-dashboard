import React from 'react'
import styled from 'styled-components'
const Loading = ({ center }) => {
  return (
    <section className="wrapper-container container">
      <div className={center ? 'loading loading-center' : 'loading'}></div>
    </section>
  )
}

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Loading
