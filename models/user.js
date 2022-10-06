var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')

var userCustomerSchema = new Schema({
    fName: {
        type: String,
        require: true
    },
    lName: {
        type: String,
        require: false
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    district: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    jobType: {
        type: String,
        require: false
    },
    userType: {
        type: String,
        require: false
    },
    accountStatus: {
        type: String,
        require: false,
        default: "pending"
    },
    profilePic : {
        type: String,
        required: false
    },
    nicFront : {
        type: String,
        required: false
    },
    nicBack : {
        type: String,
        required: false
    },
    oneSignalID : {
        type: String,
        required: true
    }
})

userCustomerSchema.pre('save',function(next) {
    var user = this;
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10, function(err, salt){
            if(err){
                return next(err)
            }
            bcrypt.hash(user.password, salt, function(err,hash){
                if(err){
                    return next(err)
                }
                user.password = hash;
                next()
            })
        })
    }
    else{
        return next()
    }
})

userCustomerSchema.methods.comparePassword = function(passw,cb){
    bcrypt.compare(passw, this.password,function (err,isMatch){
        if(err){
            return cb(err)
        }
        cb(null,isMatch)
    })
}

module.exports = mongoose.model('userCustomer',userCustomerSchema, 'users')