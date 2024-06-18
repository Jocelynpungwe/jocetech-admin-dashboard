import StatItem from './StatItem'
import { FaShoppingCart, FaDollarSign } from 'react-icons/fa'
import { IoMdBasket } from 'react-icons/io'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
const StatsContainer = ({ productsStat, totalSale, orderStat }) => {
  const defaultStats = [
    {
      title: 'total sales',
      count: formatPrice(totalSale),
      icon: <FaDollarSign />,
      color: 'var(--actual-white)',
      bcg: 'var(--primary-chocolate)',
    },
    {
      title: 'total orders',
      count: orderStat,
      icon: <FaShoppingCart />,
      color: 'var(--actual-white)',
      bcg: 'var(--green-dark)',
    },
    {
      title: 'total products',
      count: productsStat,
      icon: <IoMdBasket />,
      color: 'var(--actual-white)',
      bcg: 'var(--primary-900)',
    },
  ]

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />
      })}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  margin-top: 30px;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
  }
`
export default StatsContainer
