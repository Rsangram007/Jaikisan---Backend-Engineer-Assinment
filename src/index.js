const express=require("express")
const mongoose = require("mongoose")
const Router=require("./Router/Router")


mongoose.set("strictQuery",false)
mongoose.connect("mongodb+srv://Rsangram890:hPZbgpmJvegZil8Q@cluster0.osqcdhn.mongodb.net/Jaykisan?retryWrites=true&w=majority",{
    useNewUrlParser:true
}).then(()=>{console.log("Mongodb is connected")})
  .catch((err)=>console.log(err))

 
const app = express()
app.use(express.json())
app.use("/",Router)

app.use("/*",(req,res)=>{return res.status(400).send({status:false,messsage:"your end point is not correct"})})

app.listen(process.env.PORT|| 3000,()=>{console.log("SERVER CONNECTED "+(process.env.PORT||3000))})
