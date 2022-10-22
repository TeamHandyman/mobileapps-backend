const mongoose = require('mongoose');

const custJobSchema = mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    fName: {
        type: String,
        require: true
    },
    lName: {
        type: String,
        require: false
    },
    proPic: {
        type: String,
        require: false
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
    oneSignalID : {
        type: String,
        required: true
    },
    latitude : {
        type: String,
        required: true
    },
    longitude : {
        type: String,
        required: true
    },
    urls : [String],

    jobStatus : {
        type: String,
        require: false,
        default: "pending"
    },
    
})

module.exports = custJobModel = mongoose.model('custJobModel',custJobSchema,'customerJobs')