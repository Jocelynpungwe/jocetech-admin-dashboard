import StatItem from './StatItem'
import { FaShoppingCart, FaDollarSign } from 'react-icons/fa'
import { BiSolidBox } from 'react-icons/bi'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
const StatsContainer = ({ productsStat, totalSale, orderStat }) => {
  const defaultStats = [
    {
      title: 'total sales',
      count: formatPrice(totalSale),
      icon: <FaDollarSign />,
      color: 'var(--white)',
      bcg: 'var(--primary-900)',
    },
    {
      title: 'total orders',
      count: orderStat,
      icon: <FaShoppingCart />,
      color: 'var(--white)',
      bcg: 'var(--green-dark)',
    },
    {
      title: 'total products',
      count: productsStat,
      icon: <BiSolidBox />,
      color: 'var(--white)',
      bcg: 'var(--red-dark)',
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
  margin-top: 1.875rem;
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
