
const bcrypt = require("bcryptjs/dist/bcrypt");
const expressAsyncHandler=require("express-async-handler");

const getProducts=expressAsyncHandler(async(req,res)=>{
    //get userCollection obj from req
    let productCollectionObject=req.app.get("productCollectionObject")
    //get users data from usercollection and pack them into an array
    let products=await productCollectionObject.find().toArray()
    //send res
    res.send({message:"list of products",payload:products})
   
   // //res.send({message:users})
})
const getProductByProductname=expressAsyncHandler(async(req,res)=>{
    //get userCollection obj from req
    let productCollectionObject=req.app.get("productCollectionObject")
    //get userid from url
  // console.log(req.params)//{id:100}
   let productnameOfUrl=req.params.productname;
   let product = await productCollectionObject.findOne({productname:productnameOfUrl})
   //send response
   res.send({message:"product data",payload:product})
})
const createProduct=expressAsyncHandler(async(req,res)=>{
    //post userCollection obj from req
    let productCollectionObject=req.app.get("productCollectionObject")
    //get user obj
    let productObj = req.body;
    //insert userobj to usercollection
    let result=await productCollectionObject.insertOne(productObj)
    console.log(result)
    // //console.log("user obj is",userObj)
    // //push userObj to users
    // users.push(userObj);
    //send res
    if(result.acknowledged==true){
    res.send({message:"product created successfully"})
    }
    else{
        res.send({message:"Error in product creation"})
    }
})
const updateProduct=expressAsyncHandler(async(req,res)=>{
    //update userCollection obj from req
    let productCollectionObject=req.app.get("productCollectionObject")
   //get modified userobj
   let modifiedProductObj=req.body;
   //update userobj in usercollection
   let result=await productCollectionObject.updateOne({productname:modifiedProductObj.productname},{$set:{...modifiedProductObj}})
   console.log(result)
   //send res
   if(result.acknowledged==true){
       res.send({message:"product updated successfully"})
       }
       else{
           res.send({message:"Error in product updation"})
       }
    })
const deleteProduct=expressAsyncHandler(async(req,res)=>{
        //update userCollection obj from req
        let productCollectionObject=req.app.get("productCollectionObject")
       //get userid from url
     // console.log(req.params)//{id:100}
      let productnameFromUrl=req.params.productname;
      //delete user from user collection
      const result=await productCollectionObject.deleteOne({productname:productnameFromUrl})
      console.log(result)
      if(result.deletedCount==1){
       res.send({message:"product deleted successfully"})
       }
       else{
           res.send({message:"Error in product deletion"})
       }
    })
module.exports={getProducts,getProductByProductname,createProduct,updateProduct,deleteProduct}