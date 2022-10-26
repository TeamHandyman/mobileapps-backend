var User = require('../models/user')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
const multer = require('multer')
const proPic = require('../models/proPic')
const nicFront = require('../models/nicFront')
const nicBack = require('../models/nicBack')
const customerJob = require('../models/customerJob')
const custJobImage = require('../models/custJobImage')
const pushNotificationService = require('../services/push_notification_service')
const { ONE_SIGNAL_CONFIG } = require('../config/notification.config')
const quotation =  require('../models/quotation')
const workerPortfolio =  require('../models/workerPortfolio')
var ObjectId = require('mongodb').ObjectId;
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
                userType: "customer",
                profilePic: req.body.proPicUrl,
                oneSignalID: req.body.oneSignalID,
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
                userType: "worker",
                nicFront: req.body.nicFrontUrl,
                nicBack: req.body.nicBackUrl,
                profilePic: req.body.proPicUrl
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
                fName: req.body.fName,
                lName: req.body.lName,
                district: req.body.district,
                proPic: req.body.proPic,
                title: req.body.title,
                workerType: req.body.workerType,
                description: req.body.description,
                date: req.body.date,
                oneSignalID: req.body.oneSignalID,
                latitude: req.body.lat,
                longitude: req.body.long,
            });
            req.body.url1 ? newCustJob.urls.push(req.body.url1) : null,
            req.body.url2 ? newCustJob.urls.push(req.body.url2) : null,
            req.body.url3 ? newCustJob.urls.push(req.body.url3) : null,
            req.body.url4 ? newCustJob.urls.push(req.body.url4) : null,
            req.body.url5 ? newCustJob.urls.push(req.body.url5) : null,
            
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
    workerPortfolio: function (req,res){
        if((!req.body.email)){
            res.json({success: false, msg: 'Please fill all the required fields'})
        }
        else{
            var newWorkerPortfolio = workerPortfolio({
                email: req.body.email
            });
            req.body.url1 ? newWorkerPortfolio.urls.push(req.body.url1) : null,
            req.body.url2 ? newWorkerPortfolio.urls.push(req.body.url2) : null,
            req.body.url3 ? newWorkerPortfolio.urls.push(req.body.url3) : null,
            req.body.url4 ? newWorkerPortfolio.urls.push(req.body.url4) : null,
            req.body.url5 ? newWorkerPortfolio.urls.push(req.body.url5) : null,
            
            newWorkerPortfolio.save(function(err, newWorkerPortfolio){
                if(err){
                    res.json({success:false , msg:'Failed to save'})
                }
                else{
                    res. json({success: true, msg: 'Successfully Registered'})
                }
            })
        }
        
    },
    createQuotation: function (req,res){
        if((!req.body.workerEmail) || (!req.body.customerEmail)){
            res.json({success: false, msg: 'Please fill all the required fields'})
        }
        else{
            var newQuotation = quotation({
                jobId: req.body.jobId,
                customer: req.body.customerEmail,
                customerName: req.body.custName,
                worker: req.body.workerEmail,
                jobTitle: req.body.jobTitle,
            });
            
            newQuotation.save(function(err, newQuotation){
                if(err){
                    res.json({success:false , msg:'Failed to save'})
                }
                else{
                    res. json({success: true, msg: 'Successfully Saved'})
                }
            })
        }
    },
    acceptCustomerJob: function(req,res){
    
        customerJob.updateOne({ _id: req.body.id }, { $push: {"responses": req.body.email} }, function(
            err,
            result
          ) {
            if (err) {
              res.send(err);
            } else {
              res.json(result);
            }
          });
    },
    confirmJob: function(req,res){
        var today = new Date();
        quotation.updateOne({ jobId: req.body.jobId }, { status: "confirmed", confirmedDate : today }, function(
            err,
            result
          ) {
            if (err) {
              res.send(err);
            } else {
              res.json(result);
            }
          });
    },
    markJobAsComplete: function(req,res){
        
        
        quotation.updateOne({ jobId: req.body.jobId }, { status: "completed"}, function(
            err,
            result
          ) {
            if (err) {
              res.send(err);
            } else {
              res.json(result);
            }
          });
    },
    increaseJobCount: function(req,res){
        
        
        User.updateOne({ email: req.body.email, userType: "worker" }, { $inc: {jobCount:1}}, function(
            err,
            result
          ) {
            if (err) {
              res.send(err);
            } else {
              res.json(result);
            }
          });
    },
    workerUpdateQuotation: function(req,res){
        var hourlyRate,estimatedTotal;
        if(req.body.revenueMethod == "Hourly rate"){
            hourlyRate = req.body.rateOrTotal;
        }else{
            estimatedTotal = req.body.rateOrTotal;
        }
    
        quotation.updateOne({ _id: req.body.id }, { 
            revenueMethod : req.body.revenueMethod,
            hourlyRate : hourlyRate? hourlyRate : null,
            estimatedTotal : estimatedTotal? estimatedTotal : null,
            estimatedDate : req.body.estimatedDate,
            description : req.body.description,
            imgUrl: req.body.imgUrl,
            status: "recieved",
            workerName: req.body.workerName
        }, function(
            err,
            result
          ) {
            if (err) {
              res.send(err);
            } else {
              res.json(result);
            }
          });
    },
    updateWorkerAdDesc: function(req,res){
        User.updateOne({ email: req.body.email, userType: "worker" }, { 
            workerAdDesc: req.body.desc
        }, function(
            err,
            result
          ) {
            if (err) {
              res.send(err);
            } else {
              res.json(result);
            }
          });
    },
    updateWorkerAdImg: function(req,res){
        User.updateOne({ email: req.body.email, userType: "worker" }, { 
            workerAdImgUrl: req.body.url
        }, function(
            err,
            result
          ) {
            if (err) {
              res.send(err);
            } else {
              res.json(result);
            }
          });
    },
    getAcceptedStateCustomerJob: function(req,res){
        customerJob.findOne({
            _id: req.body.id,
        }, function(err,customerJob){
            if(err) throw err
            if(!customerJob){
                res.json({success:false})
            }
            else{
                res.json({success:true,emails:customerJob.responses})
            }
        })
    },
    getQuotationState: function(req,res){
        quotation.findOne({
            worker: req.body.workerEmail,
            customer: req.body.customerEmail,
        }, function(err,quotation){
            if(err) throw err
            if(!quotation){
                res.json({success:false})
            }
            else{
                res.json({success:true})
            }
        })
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
        customerJob.aggregate([
            { $lookup:
               {
                 from: 'products',
                 localField: 'product_id',
                 foreignField: '_id',
                 as: 'orderdetails'
               }
             }
            ])
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
    getWorkerAds: async function(req,res){
        
        User.find({
            userType: "worker"
        }, function(err,u){
            if(err) throw err
            if(u){
                res.json({success:true,u:u})
            }
            else{
                res.json({success:false})
            }
        })
        
        
    },
    getRecievedQuotations: async function(req,res){
        
        quotation.find({
            customer: req.query['email'],
            status: "recieved"
        }, function(err,u){
            if(err) throw err
            if(u){
                res.json({success:true,u:u})
            }
            else{
                res.json({success:false})
            }
        })
        
        
    },
    getCompletedQuotations: async function(req,res){
        
        quotation.find({
            customer: req.query['email'],
            status: "completed"
        }, function(err,u){
            if(err) throw err
            if(u){
                res.json({success:true,u:u})
            }
            else{
                res.json({success:false})
            }
        })
        
        
    },
    getConfirmedQuotations: async function(req,res){
        
        quotation.find({
            customer: req.query['email'],
            status: "confirmed"
        }, function(err,u){
            if(err) throw err
            if(u){
                res.json({success:true,u:u})
            }
            else{
                res.json({success:false})
            }
        })
        
        
    },
    getCustomerNotificationsForJobAccept: async function(req,res){
        
        customerJob.find({
            email: req.query['email']
        }, function(err,job){
            if(err) throw err
            if(job){
                res.json({success:true,responses:job})
            }
            else{
                res.json({success:false})
            }
        })
        
        
    },
    getCustomerNotificationsForQuotations: async function(req,res){
        
        quotation.find({
            email: req.query['email'],
            status: "recieved"
        }, function(err,job){
            if(err) throw err
            if(job){
                res.json({success:true,responses:job})
            }
            else{
                res.json({success:false})
            }
        })
        
        
    },
    getWorkerNotificationsForQuotationRequests: async function(req,res){
        
        quotation.find({
            workerEmail: req.query['email'],
            status: "pending"
        }, function(err,quotations){
            if(err) throw err
            if(quotations){
                res.json({success:true,quotations:quotations})
            }
            else{
                res.json({success:false})
            }
        })
        
        
    },
    getInfo: function(req,res){
        User.findOne({
            email: req.query['email']
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
    SendNotification: function(req,res,next){
        const device = [req.query['device']];
        var message = {
            app_id: ONE_SIGNAL_CONFIG.APP_ID,
            contents: {en: req.query['msg']},
            included_segments: ["included_player_ids"],
            include_player_ids: device,
            content_available: true,
            small_icon : "ic_notification_icon",
            data: {
                PushTitle: "Custom notification",
            },
        };

        pushNotificationService.SendNotification(message, (error, results)=>{
            if(error){
                return next(error);
            }
            return res.status(200).send({
                message: "Success",
                data: results,
            });
        });
    },
    

} 

module.exports = functions