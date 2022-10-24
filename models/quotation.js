const mongoose = require('mongoose');
var User = require('../models/user')

const quoteSchema = mongoose.Schema({
    customer:{
        type: String,
        required: true
    },
    worker:{
        type: String,
        required: true
    },
    
})

module.exports = quoteModel = mongoose.model('quoteModel',quoteSchema,'quotations')