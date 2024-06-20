const { StatusCodes } = require('http-status-codes')
const Product = require('../models/Product')
const { NotFoundError, BadRequestError } = require('../errors')
const path = require('path')

const createProduct = async (req, res) => {
  req.body.user = req.user.userId
  const product = await Product.create(req.body)
  res.status(StatusCodes.CREATED).json({ product })
}

const getAllProducts = async (req, res) => {
  const products = await Product.find({})
  res.status(StatusCodes.OK).json({ products, count: products.length })
}

const getSingleProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id }).populate(
    'reviews'
  )
  if (!product) {
    throw new NotFoundError(`No product with id : ${req.params.id}`)
  }

  res.status(StatusCodes.OK).json({ product })
}

const updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )
  if (!product) {
    throw new NotFoundError(`No product with id : ${req.params.id}`)
  }
  res.status(StatusCodes.OK).json({ product })
}

const deleteProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id })
  if (!product) {
    throw new NotFoundError(`No product with id : ${req.params.id}`)
  }

  await product.deleteOne()
  res.status(StatusCodes.OK).json({ msg: 'Success! Product removed.' })
}

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError('No File Uploaded')
  }

  const productImage = req.files.images

  console.log(productImage)
  if (!productImage.mimetype.startsWith('image')) {
    throw new BadRequestError('Please Upload Image')
  }

  const maxSize = 1024 * 1024
  if (productImage.size > maxSize) {
    throw new BadRequestError('Please upload image smaller 1MB')
  }

  const imagePath = path.join(
    __dirname,
    `../public/uploads/${productImage.name}`
  )
  await productImage.mv(imagePath)

  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` })
}

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
}
