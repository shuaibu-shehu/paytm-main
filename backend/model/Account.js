const mongoose = require('mongoose');
const { object } = require('zod');

const accountSchema = new mongoose.Schema({
    userId:{
        type:Object,
        required:true,
    },
    balance:{
        type:Number,
        required:true,
    },

},{timestamps:true});

module.exports=mongoose.model('Account',accountSchema);