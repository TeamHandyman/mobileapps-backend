var User = require('../models/user')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
const multer = require('multer')
const proPic = require('../models/proPic')
const nicFront = require('../models/nicFront')
const nicBack = require('../models/nicBack')
const customerJob = require('../models/customerJob')
const custJobImage = require('../models/custJobImage')
// const cloudinary = require('cloudinary')


var functions = {

    addNewCustomer: function (req,res){
        if((!req.body.email) || (!req.body.password) || (!req.body.phone) || (!req.body.fName) || (!req.body.gender) || (!req.body.district)){
            res.json({success: false, msg: 'Please fill all the required fields'})
        }
        else{
            var newCustomer = User({
                fName: req.body.fName,
                lName: req.body.lName,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender,
                district: req.body.district,
                userType: "customer"
            });
            newCustomer.save(function(err, newCustomer){
                if(err){
                    res.json({success:false , msg:'Failed to save'})
                }
                else{
                    res. json({success: true, msg: 'Successfully Registered'})
                }
            })
        }
    },
    addNewWorker: function (req,res){
        if((!req.body.email) || (!req.body.password) || (!req.body.phone) || (!req.body.fName) || (!req.body.gender) || (!req.body.district) || (!req.body.city) || (!req.body.jobType)){
            res.json({success: false, msg: 'Please fill all the required fields'})
        }
        else{
            var newWorker = User({
                fName: req.body.fName,
                lName: req.body.lName,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender,
                district: req.body.district,
                city: req.body.city,
                jobType: req.body.jobType,
                userType: "worker"
            });
            newWorker.save(function(err, newWorker){
                if(err){
                    res.json({success:false , msg:'Failed to save'})
                }
                else{
                    res. json({success: true, msg: 'Successfully Registered'})
                }
            })
        }
    },
    postJobCustomer: function (req,res){
        if((!req.body.title) || (!req.body.workerType) || (!req.body.description) || (!req.body.date)){
            res.json({success: false, msg: 'Please fill all the required fields'})
        }
        else{
            var newCustJob = customerJob({
                email: req.body.email,
                title: req.body.title,
                workerType: req.body.workerType,
                description: req.body.description,
                date: req.body.date,
                
            });
            newCustJob.save(function(err, newCustJob){
                if(err){
                    res.json({success:false , msg:'Failed to save'})
                }
                else{
                    res. json({success: true, msg: 'Successfully Registered'})
                }
            })
        }
    },
    uploadProPic: function (req,res){
        if((!req.body.email) || (!req.body.url)){
            res.json({success: false, msg: 'Please fill all the required fields'})
        }
        else{
            var newPropic = proPic({
                email: req.body.email,
                url: req.body.url,
            });
            newPropic.save(function(err, newPropic){
                if(err){
                    res.json({success:false , msg:'Failed to save'})
                }
                else{
                    res. json({success: true, msg: 'Successfully Registered'})
                }
            })
        }
    },
    uploadCustJobImage: function (req,res){
        if((!req.body.email) || (!req.body.url)){
            res.json({success: false, msg: 'Please fill all the required fields'})
        }
        else{
            var newCustJobImage = custJobImage({
                email: req.body.email,
                url: req.body.url,
            });
            newCustJobImage.save(function(err, newCustJobImage){
                if(err){
                    res.json({success:false , msg:'Failed to save'})
                }
                else{
                    res. json({success: true, msg: 'Successfully Registered'})
                }
            })
        }
    },
    uploadNicFront: function (req,res){
        if((!req.body.email) || (!req.body.url)){
            res.json({success: false, msg: 'Please fill all the required fields'})
        }
        else{
            var newNicFront = nicFront({
                email: req.body.email,
                url: req.body.url,
            });
            newNicFront.save(function(err, newNicFront){
                if(err){
                    res.json({success:false , msg:'Failed to save'})
                }
                else{
                    res. json({success: true, msg: 'Successfully Registered'})
                }
            })
        }
    },
    uploadNicBack: function (req,res){
        if((!req.body.email) || (!req.body.url)){
            res.json({success: false, msg: 'Please fill all the required fields'})
        }
        else{
            var newNicBack = nicBack({
                email: req.body.email,
                url: req.body.url,
            });
            newNicBack.save(function(err, newNicBack){
                if(err){
                    res.json({success:false , msg:'Failed to save'})
                }
                else{
                    res. json({success: true, msg: 'Successfully Registered'})
                }
            })
        }
    },
    loginCustomer: function(req,res){
        User.findOne({
            email: req.body.email,
            userType: req.body.userType
        }, function(err,user){
            if(err) throw err
            if(!user){
                res.json({success:false, msg: 'User not found!'})  
            }
            else{
                user.comparePassword(req.body.password, function(err,isMatch){
                    if(isMatch && !err){
                        var token = jwt.encode(user, config.secret)
                        res.json({success:true, token: token})  
                    }
                    else{
                        res.json({success:false, msg: 'Incorrect Credentials!'})  
                    }
                })
            }
        })
    },
    checkEmailAvailability: function(req,res){
        User.findOne({
            email: req.body.email,
            userType: req.body.userType
        }, function(err,user){
            if(err) throw err
            if(!user){
                res.json({success:true})
            }
            else{
                res.json({success:false})
            }
        })
    },
    checkPhoneAvailability: function(req,res){
        User.findOne({
            phone: req.body.phone,
            userType: req.body.userType
        }, function(err,user){
            if(err) throw err
            if(!user){
                res.json({success:true})
            }
            else{
                res.json({success:false})
            }
        })
    },
    // getPropic: async function(req,res){
    //     try{
    //         const propic = await proPicModel.findOne({
    //             email: "abcd@gmail.com"
    //         })
    //         // console.log(propic+"asdsda")
    //         res.json(propic)
    //     }catch(err){
    //         res.send('Error'+err)
    //     }
        
    // },
    getCustomerAds: async function(req,res){
        customerJob.find({
            workerType: req.query['term']
        }, function(err,job){
            if(err) throw err
            if(job){
                res.json({success:true,job:job})
            }
            else{
                res.json({success:false})
            }
        })
        
        
    },
    getInfo: async function(req,res){
        User.find({
            workerType: req.query['email']
        }, function(err,user){
            if(err) throw err
            if(user){
                res.json({success:true,user:user})
            }
            else{
                res.json({success:false})
            }
        })
        
        
    },
    getEmail: function(req,res){
        if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
            var token = req.headers.authorization.split(' ')[1]
            var decodedToken = jwt.decode(token,config.secret)
            return res.json({success:true,email:decodedToken.email})
        }
        else{
            return res.json({success:false, msg:'No headers'})
        }
    },

} 

module.exports = functions