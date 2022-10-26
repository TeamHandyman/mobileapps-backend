const mongoose = require('mongoose');


const workerPortSchema = mongoose.Schema({
    
    email : {
        type: String,
        required: false
    },
    urls: [String]
})

module.exports = workerPortModel = mongoose.model('workerPortModel',workerPortSchema,'workerPortfolios')