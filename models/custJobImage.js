const mongoose = require('mongoose');

const custJobImageSchema = mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    url : {
        type: String,
        required: true
    }
})

module.exports = custJobImageModel = mongoose.model('custJobImageModel',custJobImageSchema,'customerJobImages')