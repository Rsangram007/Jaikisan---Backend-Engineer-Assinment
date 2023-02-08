const express=require('express')
const Router=express.Router()

//Controller
const{CreateUser,getuser,deleteuser}=require("../Controller/CoustomerController")
const{cretecard,fetchCard}=require("../Controller/CardController")
const{vcreateUser, vdeletecoustmor,vcreateCarduser}=require("../Validation/validation")


//middlerware



Router.post('/Create', vcreateUser,CreateUser)
Router.get("/getdetails" ,getuser)
Router.delete("/deleed/:userId", vdeletecoustmor,deleteuser)




Router.post("/createcard",vcreateCarduser,cretecard)
Router.get("/getcard",fetchCard)


module.exports=Router