//create mini express app
const exp=require("express");
const productApp=exp.Router();
const {getProducts,getProductByProductname,createProduct,updateProduct,deleteProduct}=require("../Controllers/productController")


//define routes
//create a sample middleware
// const middleware1=(req,res,next)=>{
//     console.log("middleware1 is executed")
// }
// const middleware2=(req,res,next)=>{
//     console.log("middleware2 is executed")
// }

//make middleware 1 to execute for every req
//userApp.use(middleware1)


// let products=[];
//create user API

//getusers
productApp.get('/get-products',getProducts)
// (req,res)=>{
//     res.send({message:products})
// })
// //get user by id
productApp.get('/get-product/:productname',getProductByProductname)
// (req,res)=>{
//     //get userid from url
//    console.log(req.params)//{id:100}
//    let productId=(+req.params.id);
//    //find user by userid
//    let productObj=products.find(productObj=>productObj.id==productId)
//    //if user not existed
//    if(productObj==undefined){
//        res.send({message:"product not found"})
//    }
//    //if user existed
//    else{
//        res.send({message:productObj})
//    }
// })
//create user
productApp.post('/create-product',createProduct)
// (req,res)=>{
//     //get user obj
//     let productObj = req.body;
//     //console.log("user obj is",userObj)
//     //push userObj to users
//     products.push(productObj);
//     //send res
//     res.send({message:"product created successfully"})
// })
//update user
productApp.put("/update-product",updateProduct)
// (req,res)=>{
//     //get modified userobj
//     let modifiedProductObj=req.body;
//     //replace old userobj with modified user obj
//     let indexOfProduct=products.findIndex(productObj=>productObj.id==modifiedProductObj.id)
//     //if user not existed
//     if(indexOfProduct==-1){
//         res.send({message:"product not existed to update"});
//     }
//     //if user existed
//     products.splice(indexOfProduct,0,modifiedProductObj);
//     res.send({message:"Product modified Successfully"})
// })
//delete user by id
productApp.delete('/delete-product/:productname',deleteProduct)
// (req,res)=>{
//     //get userid from url
//   // console.log(req.params)//{id:100}
//    let productId=(+req.params.id);
//    //find user by userid
//    let productObj=products.find(productObj=>productObj.id==productId)
//    //if user not existed
//    if(productObj==undefined){
//        res.send({message:"product not found"})
//    }
//    //if user existed
//    else{
//        products.splice(productObj);
//        res.send({message:" product deleted successfully"})
//    }
// })





//export product app
module.exports=productApp;