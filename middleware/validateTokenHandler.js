const asyncHandler=require("express-async-handler")
const jwt=require('jsonwebtoken')

const validateToken=asyncHandler(async(req,res,next)=>{
    let token;

    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer')){
        token=authHeader.split(' ')[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,decode)=>{
            if(err){
                res.send(401)
                throw new Error('User not authorised')
            }
            req.user=decode.user
            next()
        });
        if(!token){
            res.status(401)
            throw new Error('User not authorised or mising token')
        }
    }

})

module.exports=validateToken