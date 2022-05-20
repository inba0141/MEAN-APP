const exp=require("express")
const adminApp=exp.Router();
const {adminLogin,createProduct,getProducts,updateProduct,deleteProduct, getProductByProductid,getProtectedInfo}=require('../Controllers/adminController');
const verifyToken=require("../Middlewares/verifyToken")

const cloudinary=require("cloudinary").v2;
const { CloudinaryStorage }=require("multer-storage-cloudinary")
const multer=require("multer")
//configure clo
cloudinary.config({
    cloud_name:"dd6s0zi8s",
    api_key:"287141123439689",
    api_secret:"PRuJOupZwfXjojvUSZuwrRNUY9U"
})
//configure multer-storage-cloudinary
const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'ProductImage',
      //format: async (req, file) => 'png', // supports promises as well
      public_id: (req, file) => file.fieldname+'-'+Date.now(),
    },
  });


//configure multer

const upload=multer({storage:cloudStorage})



//admin login
adminApp.post("/login-admin",adminLogin)
//create product
adminApp.post("/create-product",createProduct)
//view products
adminApp.get("/view-products",getProducts)
//get product by productid
adminApp.get("view-product/:productid",getProductByProductid)
//update product
adminApp.put("/update-product",updateProduct)
//remove product by id
adminApp.delete("/delete-product/:productname",deleteProduct)

adminApp.get("/get-protected-data",verifyToken,getProtectedInfo);


module.exports=adminApp;