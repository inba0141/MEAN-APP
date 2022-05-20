//create mini express app(user app)
const exp=require("express");
const userApp=exp.Router()
const {getUsers,getUsersByUsername,createUser, updateUser,deleteUser,loginUser,getProtectedInfo}=require("../Controllers/userController")
const verifyToken=require("../Middlewares/verifyToken")
//const checkUser=require("../Middlewares/checkUser")
const cloudinary=require("cloudinary").v2;
const { CloudinaryStorage }=require("multer-storage-cloudinary")
const multer=require("multer")
require("dotenv").config()
//configure cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
//configure multer-storage-cloudinary
const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'cdb22dx0011',
      //format: async (req, file) => 'png', // supports promises as well
      public_id: (req, file) => file.fieldname+'-'+Date.now(),
    },
  });

//configure multer

const upload=multer({storage:cloudStorage})

//create a sample middleware
// const middleware1=(req,res,next)=>{
//     console.log("middleware1 is executed")
//     //res.send({message:"This reply is from middleware1"})
//     next()
// }
// const middleware2=(req,res,next)=>{
//     console.log("middleware2 is executed")
//     next()
// }
//make middleware 1 to execute for every req
//userApp.use(middleware1)


// let users=[];
//create user API

//getusers
 //get users data from usercollection
userApp.get('/get-users',getUsers)

// async(req,res)=>{
//     //get userCollection obj from req
//     let userCollectionObject=req.app.get("userCollectionObject")
//     //get users data from usercollection and pack them into an array
//     let users=await userCollectionObject.find().toArray()
//     //send res
//     res.send({message:"list of users",payload:users})
   
//    // //res.send({message:users})
// })
//get user by username
userApp.get('/get-user/:username',getUsersByUsername)
// async(req,res)=>{
//     //get userCollection obj from req
//     let userCollectionObject=req.app.get("userCollectionObject")
//     //get userid from url
//   // console.log(req.params)//{id:100}
//    let usernameOfUrl=req.params.username;
//    let user = await userCollectionObject.findOne({username:usernameOfUrl})
//    //send response
//    res.send({message:"user data",payload:user})
//    try{
//    //find user by userid
//    let userObj=users.find(userObj=>userObj.id==userId)
//    //if user not existed
//    if(userObj==undefined){
//        res.send({message:"User not found"})
//    }
//    //if user existed
//    else{
//        res.send({message:userObj})
//    }
// }
// catch(err){
//     res.send({message:err.message})
// }

    //get user by id from usercollection

// })
//create user
userApp.post('/create-user',upload.single('profilePic'),createUser)
// async(req,res)=>{
//     //post userCollection obj from req
//     let userCollectionObject=req.app.get("userCollectionObject")
//     //get user obj
//     let userObj = req.body;
//     //insert userobj to usercollection
//     let result=await userCollectionObject.insertOne(userObj)
//     console.log(result)
//     // //console.log("user obj is",userObj)
//     // //push userObj to users
//     // users.push(userObj);
//     //send res
//     if(result.acknowledged==true){
//     res.send({message:"user created successfully"})
//     }
//     else{
//         res.send({message:"Error in user creation"})
//     }
// })

//login user
userApp.post('/login-user',loginUser)



//update user
userApp.put("/update-user",updateUser)
// async(req,res)=>{
//     //update userCollection obj from req
//     let userCollectionObject=req.app.get("userCollectionObject")
//    //get modified userobj
//    let modifiedUserObj=req.body;
//    //update userobj in usercollection
//    let result=await userCollectionObject.updateOne({username:modifiedUserObj.username},{$set:{...modifiedUserObj}})
//    console.log(result)
//    //send res
//    if(result.acknowledged==true){
//        res.send({message:"user updated successfully"})
//        }
//        else{
//            res.send({message:"Error in user updation"})
//        }
    //replace old userobj with modified user obj
    // let indexOfUser=users.findIndex(userObj=>userObj.id==modifiedUserObj.id)
    // //if user not existed
    // if(indexOfUser==-1){
    //     res.send({message:"user not existed to update"});
    // }
    // //if user existed
    // users.splice(indexOfUser,0,modifiedUserObj);
    // res.send({message:"User modified Successfully"})
// })
//delete user by id
userApp.delete('/delete-user/:username',deleteUser)
// async(req,res)=>{
//     //update userCollection obj from req
//     let userCollectionObject=req.app.get("userCollectionObject")
//    //get userid from url
//  // console.log(req.params)//{id:100}
//   let usernameFromUrl=req.params.username;
//   //delete user from user collection
//   const result=await userCollectionObject.deleteOne({username:usernameFromUrl})
//   console.log(result)
//   if(result.deletedCount==1){
//    res.send({message:"user deleted successfully"})
//    }
//    else{
//        res.send({message:"Error in user deletion"})
//    }
   
   
   //find user by userid
//    let userObj=users.find(userObj=>userObj.id==userId)
//    //if user not existed
//    if(userObj==undefined){
//        res.send({message:"User not found"})
//    }
//    //if user existed
//    else{
//        users.splice(userObj);
//        res.send({message:" user deleted successfully"})
//    }
// })

userApp.get("/get-protected-data",verifyToken,getProtectedInfo);

//export userApp
module.exports=userApp;