var User = require('../models/user')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
const multer = require('multer')
const proPicModel = require('../models/proPic')



var functions = {

    addNewCustomer: function (req,res){
        if((!req.body.email) || (!req.body.password) || (!req.body.phone) || (!req.body.fName)){
            res.json({success: false, msg: 'Please fill all the required fields'})
        }
        else{
            var newCustomer = User({
                fName: req.body.fName,
                lName: req.body.lName,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password
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
    loginCustomer: function(req,res){
        User.findOne({
            email: req.body.email
        }, function(err,user){
            if(err) throw err
            if(!user){
                res.status(403).send({success:false, msg:'User not found!'})
            }
            else{
                user.comparePassword(req.body.password, function(err,isMatch){
                    if(isMatch && !err){
                        var token = jwt.encode(user, config.secret)
                        res.json({success:true, token: token})  
                    }
                    else{
                        return res.status(403).send({success:false, msg:'Incorrect Credentials!'})
                    }
                })
            }
        })
    },
    checkEmailAvailability: function(req,res){
        User.findOne({
            email: req.body.email
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
            phone: req.body.phone
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
    getPropic: async function(req,res){
        try{
            const propic = proPicModel.findOne({
                email: "abc@gmail.com"
            })
            // console.log(propic+"asdsda")
            res.json(propic)
        }catch(err){
            res.send('Error'+err)
        }
        
    },
    getinfo: function(req,res){
        if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
            var token = req.headers.authorization.split(' ')[1]
            var decodedToken = jwt.decode(token,config.secret)
            return res.json({success:true,msg:'Hello '+decodedToken.fName})
        }
        else{
            return res.json({success:false, msg:'No headers'})
        }
    },
    // upload: function(req,res){
    //     upload.single('email')(req,res,function (err){
    //         if(err){
    //             console.log(err)
    //         }
    //         else{
    //             const newProPic = new proPicModel({
    //                 email: req.body.email,
    //                 image:{
    //                     data: req.file.filename,
    //                     contentType: 'image/png'
    //                 }
    //             })
    //             newProPic.save().then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
    //         }
    //     })
        
    // }

} 

module.exports = functions