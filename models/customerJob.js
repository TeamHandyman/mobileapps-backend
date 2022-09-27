const mongoose = require('mongoose');

const custJobSchema = mongoose.Schema({
    email : {
        type: String,
        required: true
    },
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
    },
    url1 : {
        type: String,
        required: true,
        default: null
    },
    url2 : {
        type: String,
        required: true,
        default: null
    },
    url3 : {
        type: String,
        required: true,
        default: null
    },
    url4 : {
        type: String,
        required: true,
        default: null
    },
    url5 : {
        type: String,
        required: true,
        default: null
    },
})

module.exports = custJobModel = mongoose.model('custJobModel',custJobSchema,'customerJobs')