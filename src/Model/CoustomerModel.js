const mongoose = require('mongoose')

const CoustomerSchema=new mongoose.Schema({
    firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
      required: true
      },
      mobileNumber: {
        type: String,
       required: true,
         minlength: 10,
         maxlength: 10
      },
      DOB: {
        type: Date,
        required: true
      },
      emailID: {
        type: String,
        required: true,
        unique: true
      },
      address: {
        type: String,
       required: true
      },
      customerID: {
        type: String,
        required: true,
       unique: true
      },
      status: {
        type: String,
       // required: true,
        default: 'ACTIVE'
      }
},{timestamp:true})

module.exports=mongoose.model("Coustomer",CoustomerSchema)