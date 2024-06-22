const express = require('express')
const router = express.Router()

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
  getSingleUserReview,
} = require('../controllers/reviewController')

const authenticationMiddleware = require('../middleware/authentication')
const authorizePermition = require('../middleware/authorize')

router.get('/', authenticationMiddleware, getAllReviews)
router.get('/:id', authenticationMiddleware, getSingleReview)
router.get(
  '/user/:id',
  authenticationMiddleware,
  authorizePermition('admin'),
  getSingleUserReview
)
router.post('/', authenticationMiddleware, createReview)
router.patch('/:id', authenticationMiddleware, updateReview)
router.delete('/:id', authenticationMiddleware, deleteReview)

module.exports = router
