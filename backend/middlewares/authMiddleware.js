
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const protect = asyncHandler(async (req, res, next) => {
    let token;
  
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]
  
            //   verify token

            const decoded = jwt.verify(token,process.env.JWT_SECRET)
    
            // Get user 
            const user = await User.findById(decoded.id).select('-password')
            if (!user) {
                res.status(401)
                throw new Error("You are Unauthorized")

            }
        
            req.user = user
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Invalid')

        }

    }
    else {
        res.status(402)
        throw new Error('You are Unauthorized')

    }
})
module.exports = { protect }