const mongoose = require('mongoose');

const proPicSchema = mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    image: Buffer
})

module.exports = proPicModel = mongoose.model('proPicModel',proPicSchema,'proPics')