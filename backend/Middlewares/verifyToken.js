const jwt=require("jsonwebtoken");
const { getProtectedInfo } = require("../Controllers/userController");
//const { getProtectedInfo } = require("../Controllers/adminController");
require("dotenv").config();
const verifyToken=(req,res,next)=>{
    //token verification logic
    //console.log(req.headers);
    let bearerToken=req.headers.authorization;
    //console.log("bearer token is",bearerToken);
    //if req headers do not have bearertoken
    if(bearerToken==undefined){
        res.send({message:"you are not authorized to access this info"})
    }
    //if bearer token is existed
    else{
        //get token from bearertoken
        const token=bearerToken.split(" ")[1];
        //console.log(token);
        //verify Token
        jwt.verify(token,process.env.SECRET,(err,decodedToken)=>{
            //if token is expired
            if(err){
                res.send({message:"session is expired relogin to continue"})
            }
            //if token not expired
            else{
                next()
            }
        })
    }
}
module.exports=verifyToken;
