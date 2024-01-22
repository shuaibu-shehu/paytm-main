const mongoose = require('mongoose');


const accountSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    balance:{
        type:Number,
        required:true,
        default:0
    },

},{timestamps:true});

module.exports=mongoose.model('Account',accountSchema);