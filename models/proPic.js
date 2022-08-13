const mongoose = require('mongoose');

const proPicSchema = mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    image:{
        data: Buffer,
        contentType: String
    }
})

module.exports = proPicModel = mongoose.model('proPicModel',proPicSchema,'proPics')