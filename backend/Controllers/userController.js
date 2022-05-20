

const bcryptjs = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");
const expressAsyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken");
require("dotenv").config();


//to get all users
const getUsers=expressAsyncHandler(async(req,res)=>{
    //get userCollection obj from req
    let userCollectionObject=req.app.get("userCollectionObject")
    //get users data from usercollection and pack them into an array
    let users=await userCollectionObject.find().toArray()
    //send res
    res.status(200).send({message:"list of users",payload:users})
   // //res.send({message:users})
})
const getUsersByUsername=expressAsyncHandler(async(req,res)=>{
    //get userCollection obj from req
    let userCollectionObject=req.app.get("userCollectionObject")
    //get userid from url
  // console.log(req.params)//{id:100}
   let usernameOfUrl=req.params.username;
   let user = await userCollectionObject.findOne({username:usernameOfUrl})
   //send response
   res.send({message:"user data",payload:user})
})
const createUser=expressAsyncHandler(async(req,res)=>{

    //console.log(req.body.userObj);
    //console.log(req.file.path);
    //get new user obj and convert it into js obj
    let userObj=JSON.parse(req.body.userObj)
    //add image CDN link to userobj
    userObj.profilePic=req.file.path;
    //post userCollection obj from req
    let userCollectionObject=req.app.get("userCollectionObject")
    //get user obj
    //let userObj = req.body;
    //check for availability of username
    let userOfDB=await  userCollectionObject.findOne({username:userObj.username})
    //if user already existed
    if(userOfDB!==null){
        res.status(200).send({message:"Username has already taken.Please choose another name"})
    }
    //if user not existed
    else{
        //hash the password
        let hashedPassword=await bcrypt.hash(userObj.password,5)
        //replace plain password with hashed
        userObj.password=hashedPassword;
        //insert into user collection
        let result=await userCollectionObject.insertOne(userObj)
        //send response
        res.status(201).send({message:"User created"})

    }
    //insert userobj to usercollection
    // let result=await userCollectionObject.insertOne(userObj)
    // console.log(result)
    // // //console.log("user obj is",userObj)
    // // //push userObj to users
    // // users.push(userObj);
    // //send res
    // if(result.acknowledged==true){
    // res.status(201).send({message:"user created successfully"})
    // }
    // else{
    //     res.send({message:"Error in user creation"})
    // }
})
//to login user

const loginUser=expressAsyncHandler(async(req,res)=>{
    //login in userCollection 
    let userCollectionObject=req.app.get("userCollectionObject")
    //get user credentials object
    let credObject=req.body;
    //console.log(credObject)
    let userOfDB=await userCollectionObject.findOne({username:credObject.username})
    //if user not found
    if(userOfDB==null){
        res.send({message:"Invalid username"})
    }
    //if user found compare password
    else{
      let status= await bcryptjs.compare(credObject.password,userOfDB.password)
        //if password not matched
        if(status==false){
            res.send({message:"Invalid password"})
        }
        //if passwords are matched
        else{
            //create jwd token and encrypt it with a secret key
           let signedToken=jwt.sign({username:userOfDB.username},process.env.SECRET,{expiresIn:200})
            //send encrypted JWT token as res
            res.send({message:"success",token:signedToken,user:userOfDB})
        }
    
    }

})









const updateUser=expressAsyncHandler(async(req,res)=>{
    //update userCollection obj from req
    let userCollectionObject=req.app.get("userCollectionObject")
   //get modified userobj
   let modifiedUserObj=req.body;
   //update userobj in usercollection
   let result=await userCollectionObject.updateOne({username:modifiedUserObj.username},{$set:{...modifiedUserObj}})
   //console.log(result)
   //send res
   if(result.acknowledged==true){
       res.send({message:"user updated successfully"})
       }
       else{
           res.send({message:"Error in user updation"})
       }
    })
const deleteUser=expressAsyncHandler(async(req,res)=>{
    //update userCollection obj from req
    let userCollectionObject=req.app.get("userCollectionObject")
   //get userid from url
 // console.log(req.params)//{id:100}
  let usernameFromUrl=req.params.username;
  //delete user from user collection
  const result=await userCollectionObject.deleteOne({username:usernameFromUrl})
  console.log(result)
  if(result.deletedCount==1){
   res.status(204).send({message:"user deleted successfully"})
   }
   else{
       res.send({message:"Error in user deletion"})
   }
})

const getProtectedInfo=(req,res)=>{
    res.send({message:"This is private information"});
}



//export all function
module.exports={getUsers,getUsersByUsername,createUser,updateUser,deleteUser,loginUser,getProtectedInfo}