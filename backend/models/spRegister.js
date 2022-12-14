const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const spSchema = new Schema({

    name:{
        type:String,
        required:true
    },

    mobile:{
        type:Number,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    serviceType:{
        type:String,
        required:true 
    }


})

const serviceProvider = mongoose.model("ServiceProviders", spSchema)

module.exports = serviceProvider;