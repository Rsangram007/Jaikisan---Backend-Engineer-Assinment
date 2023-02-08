const mongoose = require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId

const cardmodel=new mongoose .Schema({
    
    cardNumber: {
        type: String,
      //  required: true,
        trim: true
    },

    cardType: {
        type: String,
        enum: ['REGULAR', 'SPECIAL'],
        required: true,
        trim: true
    },

    customerName: {
        type: String,
        required: true,
        trim: true
    },

    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE',
        trim: true
    },

    vision: {
        type: String,
        required: true,
        trim: true
    },

    customerID: {
        type: ObjectId,
        required: true,
        ref: 'Coustomer',
        trim: true
    }


},{timestamps:true})

module.exports=mongoose.model("carddata",cardmodel)