const customAPIError = require('./custom-errors')
const BadRequestError = require('./bad-request')
const NotFoundError = require('./not-found')
const UnAuthenticationError = require('./unaunthentication') 


module.exports = {
    customAPIError,
    BadRequestError, 
    NotFoundError,
    UnAuthenticationError
}