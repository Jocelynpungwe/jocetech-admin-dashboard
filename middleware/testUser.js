const { BadRequestError } = require('../errors')

const testUser = (req, res, next) => {
  if (req.user.name === 'test') {
    throw new BadRequestError("Test User. Can't Delete Or Update User")
  }
  next()
}

module.exports = testUser
