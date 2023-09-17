const customAPIError = require('../error/custom-errors')
const {StatusCodes} = require('http-status-codes')


const errorHandlerMiddleware = (err,req,res,next)=>{
    if(err instanceof customAPIError){
    return res.status(err.statusCode).json({msg: err.message})
}
    return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send('Something went wrong, please try again later!')
}


module.exports = errorHandlerMiddleware