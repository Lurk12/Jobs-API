const customAPIError = require('./custom-errors')
const { StatusCodes } = require('http-status-codes')


class UnAuthenticationError extends customAPIError{   
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
}
}

module.exports = UnAuthenticationError