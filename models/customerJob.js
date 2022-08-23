const mongoose = require('mongoose');

const custJobSchema = mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    workerType : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        required: true
    }
})

module.exports = custJobModel = mongoose.model('custJobModel',custJobSchema,'customerJobs')