//create express app
//const { response } = require("express");
const exp=require("express");
const app=exp();
const path=require("path")
require("dotenv").config()


//connecting with Angular App
app.use(exp.static(path.join(__dirname,'./dist/mean-app')))

//connecting to mongodb server
//import mongoclient

const mongoClient=require("mongodb").MongoClient;
const dbUrl=process.env.DBURL;

//connect to db
mongoClient.connect(dbUrl)
.then((client)=>{
    //get database object
    let databaseObject=client.db("CDB22DX0011DB")
    //get collection ojects
    let userCollectionObject=databaseObject.collection("usercollection");
    let productCollectionObject=databaseObject.collection("productcollection");
    let adminCollectionObject=databaseObject.collection("admincollection");

    //share collection objects to APIs
    app.set("userCollectionObject",userCollectionObject);
    app.set("productCollectionObject",productCollectionObject);
    app.set("adminCollectionObject",adminCollectionObject)

    console.log("connected to DB successfully");

})
.catch(err=>console.log("err in connecting to database",err))

//import apis
const userApp=require("./backend/APIs/userApi")
const productApp=require("./backend/APIs/productApi")
const adminApp=require("./backend/APIs/adminApi")
//add body parser middleware
app.use(exp.json())
//app.use(exp.multiport())
app.use(exp.urlencoded())
//if path is user,then execute userApi
app.use('/user',userApp)
//if path is Product ,then execute ProductApi
app.use('/product',productApp)
//if path is admin then execute adminapi
app.use('/admin',adminApp)

//handling invalid paths
app.use('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./dist/mean-app/index.html'),err=>{
        if(err){
            next(err)
        }
    })
})

//handling invalid paths
app.use((req,res,next)=>{
    res.status(404).send({message:`path ${req.url} does not existed`})
})

//Product Api
//handling errors
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})
//assign port number
const PORT= 4000 || process.env.PORT;
app.listen(PORT,()=>console.log(`http server on port ${PORT}`))