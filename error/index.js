const customAPIError = require('./custom-errors')
const BadRequestError = require('./bad-request')
const NotFoundError = require('./not-found')
const UnAutheticationError = require('./unaunthentication') 


module.exports = {
    customAPIError,
    BadRequestError, 
    NotFoundError,
    UnAutheticationError
}