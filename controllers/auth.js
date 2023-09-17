const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnAutheticationError} = require('../error')



const register = async(req, res)=>{
    try {
       const user = await User.create({...req.body})
       const token = user.createJWT()
        res.status(StatusCodes.CREATED ).json({user:{name:user.name, token}})
    } catch (error) {
        console.log(error);
        
    }
}       
const login = async(req, res)=>{
    const {email, password} = req.body
    if(!email || !password){
        throw new BadRequestError("Email and Password are required")
    }
    const user = await User.findOne({email})
    if(!user){
       throw new UnAutheticationError("Invalid Credentials")
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user: {name:user.name}, token})



}


module.exports = {
    register, 
    login,
}