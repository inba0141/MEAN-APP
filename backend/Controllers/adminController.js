//const bcryptjs = require("bcryptjs");
//const bcrypt = require("bcryptjs/dist/bcrypt");
const expressAsyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken");
require("dotenv").config();


const adminLogin=(req,res)=>{
    let adminObj=req.body;
    if(adminObj.username!=="admin"){
        res.send({message:"Invalid Username"})
    }
    else if(adminObj.password!=="admin"){
        res.send({message:"Invalid Password"})
    }
    else{
        //create token
        let signedToken=jwt.sign({username:adminObj.username},process.env.SECRET,{expiresIn:100})
        //send token
        res.send({message:"success",token:signedToken,admin:adminObj})
    }

}
const createProduct=expressAsyncHandler(async(req,res)=>{
    
    //get new product obj and convert it into js obj
    let productObj=JSON.parse(req.body.productObj)
    //get productCollectionObj
    let productCollectionObject=req.app.get("productCollectionObject")
    //check the availability of product
    let productOfDB=await productCollectionObject.findOne({productid:productObj.productid})
    //if product already existed
    if(productOfDB!==null){
        res.status(200).send({message:"Product is already Existed,Please try something new"})
    }
    //if product not existed
    else{
        //insert into productcollection
        let result=await productCollectionObject.inserOne(productObj)
        res.status(201).send({message:"Product Created"})
    }
})
const getProducts=expressAsyncHandler(async(req,res)=>{
    //get productCollectionObj
    let productCollectionObject=req.app.get("productCollectionObject")
    //get products data from product collection and pack them into an array
    let products=await productCollectionObject.find().toArray()
    //send res
    res.status(200).send({message:"List of Products",payload:products})

})
const getProductByProductid=expressAsyncHandler(async(req,res)=>{
    //get productCollectionObj
    let productCollectionObject=req.app.get("productCollectionObject")
    
    let productidOfUrl=req.params.productid;
    let product=await productCollectionObject.findOne({productid:productidOfUrl})
    //send response
    res.send({message:"Product data",payload:product})
})
const updateProduct=expressAsyncHandler(async(req,res)=>{
    //get productCollectionObj
    let productCollectionObject=req.app.get("productCollectionObject")
    //get modified productobj
    let modifiedProductObj=req.body;
    //update productObj  in productcollection
    let result=await productCollectionObject.updateOne({productid:modifiedProductObj.productid},{$set:{...modifiedProductObj}})
    //console.log(result)
    if(result.acknowledged==true){
        res.send({message:"Product updated successfully"})
    }
    else{
        res.send({message:"Error in user updation"})
    }
})
const deleteProduct=expressAsyncHandler(async(req,res)=>{
    //get productCollectionObj
    let productCollectionObject=req.app.get("productCollectionObject")
    //get productid from url
    let productidFromUrl=req.params.productid;
    //delete product from product collection
    const result=await productCollectionObject.deleteOne({productid:productidFromUrl})
    //console.log(result)
    if(result.deletedCount==1){
        res.status(204).send({message:"Product deleted Successfully"})
    }
    else{
        res.send({message:"Error in Product deletion"})
    }
})
const getProtectedInfo=(req,res)=>{
    res.send({message:"This is private information"});
}
module.exports={adminLogin,createProduct,getProducts,getProductByProductid,updateProduct,deleteProduct,getProtectedInfo}