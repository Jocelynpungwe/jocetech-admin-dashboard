import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { FaRegRectangleList } from 'react-icons/fa6'

const links = [
  {
    id: 1,
    text: 'dashboard',
    path: '/',
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: 'products',
    path: 'products',
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: 'orders',
    path: 'orders',
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: 'users',
    path: 'users',
    icon: <ImProfile />,
  },
  {
    id: 5,
    text: 'report',
    path: 'report',
    icon: <FaRegRectangleList />,
  },
  {
    id: 5,
    text: 'reviews',
    path: 'reviews',
    icon: <FaRegRectangleList />,
  },
  {
    id: 5,
    text: 'settings',
    path: 'settings',
    icon: <FaRegRectangleList />,
  },
]

export default links
