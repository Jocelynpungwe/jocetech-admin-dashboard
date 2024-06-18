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
        <div className="stats">
          <h5>Most Popular Products</h5>
          <BarChart data={mustOrderStats.slice(0, 5)} />
        </div>
        <div className="stats">
          <h5>Order Details</h5>
          <PieChart data={orderState} />
        </div>
      </section>
      <section className="secondary-stats">
        <div className="stats">
          <h5>Sales Statistics</h5>
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
    margin-bottom: 30px;
  }

  .stats {
    background-color: var(--white);
    margin-top: 30px;
    padding: 2rem;
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
