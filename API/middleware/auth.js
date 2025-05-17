const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


const jwtConfig = {
  secret: 'task-management',  
  expiresIn: '7d'                 
};

exports.protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      
      message: 'Not authorized to access this route'
    });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        
        message: 'User not found'
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      
      message: 'Not authorized to access this route'
    });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
}; 