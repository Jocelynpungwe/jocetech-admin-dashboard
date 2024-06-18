const express = require('express')
const router = express.Router()
const authenticationMiddleware = require('../middleware/authentication')
const authorizeMiddleware = require('../middleware/authorize')

const {
  getAllOrders,
  getSingleOrders,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
  showOrderStats,
} = require('../controllers/orderController')

router.post('/', authenticationMiddleware, createOrder)
router.get(
  '/',
  authenticationMiddleware,
  authorizeMiddleware('admin'),
  getAllOrders
)

router.get(
  '/showOrderStat',
  authenticationMiddleware,
  authorizeMiddleware('admin'),
  showOrderStats
)
router.get('/showAllMyOrders', authenticationMiddleware, getCurrentUserOrders)
router.get('/:id', authenticationMiddleware, getSingleOrders)

router.patch('/:id', authenticationMiddleware, updateOrder)

module.exports = router
