const asyncHandler=require("express-async-handler")
const jwt=require('jsonwebtoken')

const validateToken=asyncHandler((req,res,next)=>{
    let token;

    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer')){
        token=authHeader.split(' ')[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,decode)=>{
            if(err){
                res.send(401)
                throw new Error('Usr not authorised')
            }
            console.log(decode)
        });
    }

})

module.exports=validateToken