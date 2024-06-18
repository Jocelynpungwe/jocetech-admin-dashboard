const express = require('express')
const router = express.Router()

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
} = require('../controllers/reviewController')

const authenticationMiddleware = require('../middleware/authentication')

router.get('/', authenticationMiddleware, getAllReviews)
router.get('/:id', authenticationMiddleware, getSingleReview)
router.post(
  '/',
  authenticationMiddleware,

  createReview
)
router.patch('/:id', authenticationMiddleware, updateReview)
router.delete('/:id', authenticationMiddleware, deleteReview)

module.exports = router
