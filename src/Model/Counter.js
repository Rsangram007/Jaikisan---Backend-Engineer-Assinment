const mongoose = require('mongoose')
const { validate } = require('./CoustomerModel')


const counterSchema = new mongoose.Schema({

       name: String,
        seq: Number,
      
     

}, { timestamps: true })


module.exports = mongoose.model('Couter', counterSchema)
