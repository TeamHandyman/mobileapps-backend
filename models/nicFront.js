const mongoose = require('mongoose');

const nicFrontSchema = mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    url : {
        type: String,
        required: true
    }
})

module.exports = nicFrontModel = mongoose.model('nicFrontModel',nicFrontSchema,'nicFront')