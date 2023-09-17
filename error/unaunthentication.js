const customAPIError = require('./custom-errors')
const { StatusCodes } = require('http-status-codes')


class UnAutheticationError extends customAPIError{   
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
}
}

module.exports = UnAutheticationError