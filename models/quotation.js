const mongoose = require('mongoose');
var User = require('../models/user')

const quoteSchema = mongoose.Schema({
    
    jobId:{
        type: String,
        required: true
    },
    customer:{
        type: String,
        required: true
    },
    customerName:{
        type: String,
        required: true
    },
    worker:{
        type: String,
        required: true
    },
    jobTitle : {
        type: String,
        required: false
    },
    status : {
        type : String,
        required : true,
        default : "pending"
    },
    revenueMethod :{
        type: String,
        required : false,
    },
    hourlyRate :{
        type: Number,
        required : false,
    },
    estimatedTotal :{
        type: Number,
        required : false,
    },
    estimatedDate :{
        type: Date,
        required : false,
    },
    description :{
        type: String,
        required : false,
    },
    imgUrl :{
        type: String,
        required : false,
    },
})

module.exports = quoteModel = mongoose.model('quoteModel',quoteSchema,'quotations')