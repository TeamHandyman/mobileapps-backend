const mongoose = require('mongoose');

const nicBackSchema = mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    url : {
        type: String,
        required: true
    }
})

module.exports = nicBackModel = mongoose.model('nicBackModel',nicBackSchema,'nicBack')