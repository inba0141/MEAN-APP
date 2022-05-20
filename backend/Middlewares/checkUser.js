const checkUser=async(req,res,next)=>{
    //console.log("check user",req.body)
    //get usercollectionobj
    let userCollectionObject=req.app.get("userCollectionObject")
    let userObj=JSON.parse(req.body.userObj)
    //get user obj
    //let userObj = req.body;
    //check for availability of username
    let userOfDB=await  userCollectionObject.findOne({username:userObj.username})
    //if user already existed
    if(userOfDB!==null){
        res.status(200).send({message:"Username has already taken.Please choose another name"})
    }
    else{
       next();
    }
}

module.exports=checkUser;