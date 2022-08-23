const mongoose = require('mongoose');

const custJobSchema = mongoose.Schema({
    title : {
        type: Text,
        required: true
    },
    workerType : {
        type: Text,
        required: true
    },
    description : {
        type: Text,
        required: true
    },
    date : {
        type: Date,
        required: true
    }
})

module.exports = custJobModel = mongoose.model('custJobModel',custJobSchema,'customerJobs')