import React from 'react'
import styled from 'styled-components'
import BarChart from './BarChart'
import AreaChart from './AreaChart'
import PieChart from './PieChart'

import { useSelector } from 'react-redux'

const ChartsContainer = () => {
  const { orderState, monthlyOrder, mustOrderStats } = useSelector(
    (store) => store.order
  )

  return (
    <Wrapper>
      <section className="primary-stats">
        <div className="wrapper-container">
          <h5 className="title">Most Popular Products</h5>
          <BarChart data={mustOrderStats.slice(0, 5)} />
        </div>
        <div className="wrapper-container">
          <h5 className="title">Order Details</h5>
          <PieChart data={orderState} />
        </div>
      </section>
      <section className="secondary-stats">
        <div className="wrapper-container">
          <h5 className="title">Sales Statistics</h5>
          <AreaChart data={monthlyOrder} />
        </div>
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .primary-stats {
    display: grid;
  }

  .secondary-stats {
    margin-bottom: 1.875rem;
  }

  .wrapper-container {
    margin-top: 1.875rem;
  }

  @media (min-width: 768px) {
    .primary-stats {
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
    }
  }
  @media (min-width: 1120px) {
    .primary-stats {
      grid-template-columns: 2fr 1fr;
      column-gap: 1rem;
    }
  }
`

export default ChartsContainer
