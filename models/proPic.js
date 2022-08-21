const mongoose = require('mongoose');

const proPicSchema = mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    url : {
        type: String,
        required: true
    }
})

module.exports = proPicModel = mongoose.model('proPicModel',proPicSchema,'proPics')