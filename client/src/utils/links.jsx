import { MdDashboard, MdReviews, MdSettings } from 'react-icons/md'
import { BiSolidBox } from 'react-icons/bi'
import { FaCartShopping, FaUserGroup } from 'react-icons/fa6'

const links = [
  {
    id: 1,
    text: 'dashboard',
    path: '/',
    icon: <MdDashboard />,
  },
  {
    id: 2,
    text: 'products',
    path: 'products',
    icon: <BiSolidBox />,
  },
  {
    id: 3,
    text: 'orders',
    path: 'orders',
    icon: <FaCartShopping />,
  },
  {
    id: 4,
    text: 'customers',
    path: 'customers',
    icon: <FaUserGroup />,
  },
  {
    id: 5,
    text: 'reviews',
    path: 'reviews',
    icon: <MdReviews />,
  },
  {
    id: 6,
    text: 'settings',
    path: 'settings',
    icon: <MdSettings />,
  },
]

export default links
