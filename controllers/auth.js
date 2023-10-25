const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnAuthenticationError} = require('../error')



const register = async(req, res)=>{
    
        //creating through the req.body rd
       const user = await User.create({...req.body})
       const token = user.createJWT()
        res.status(StatusCodes.CREATED ).json({user:{name:user.name, token}})
 
}       
const login = async(req, res)=>{
    //email and password is provided for the login in the request body
const {email, password} = req.body
if(!email || !password){
    throw new BadRequestError ('Email and Password required')
}

// find user by email
const user = await User.findOne({email})
//if no user by email
if(!user){
    throw new UnAuthenticationError ('Invalid Credentials')
}

//compare password;'
const isPasswordCorrect = await user.comparePassword(password)
if (!isPasswordCorrect ){
    throw new UnAuthenticationError ('Incorrect Password')
}
    const token = user.createJWT()
    //returning to the postman the name and token
    res.status(StatusCodes.OK).json({user: {name:user.name}, token})



}


module.exports = {
    register, 
    login, 
} 