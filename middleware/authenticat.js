
var jwt = require('jsonwebtoken');

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                // console.log(decoded.userId)
                req.body.user=decoded.userId
                next()
            }else{
                res.send({"msg":"Please Login first 1"})
            }
        })
    }
    else{
        res.send({"msg":"Please Login first 2"})
    }
}

module.exports={authenticate}