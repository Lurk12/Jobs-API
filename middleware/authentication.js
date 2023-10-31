const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnAuthenticationError } = require('../error');

const auth = (req, res, next) => {
  // Check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnAuthenticationError('Authentication Invalid');
  }
  const token = authHeader.split(' ')[1];


    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // const user = User.findById(payload.id).select('-password')
    // req.user = user
   
   

    req.user = { userId: payload.userId, name: payload.name };
    next();
 
   
  };

module.exports = auth;
 