const jwt = require("jsonwebtoken")
require('dotenv').config()
const authenticate = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        const decoded = jwt.verify(token,"masai")
        if(decoded){
            const userID = decoded.userID
            console.log(decoded)
            req.body.userID=userID
            next()
        }else{
            res.send("please login first")
        }
    }else{
        res.send("please login first")

    }
}

module.exports={
    authenticate
}