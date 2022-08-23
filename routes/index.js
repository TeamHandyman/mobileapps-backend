const express = require('express')
const actions = require('../methods/actions')
const router = express.Router()

// router.get('/', (req,res) =>{
//     res.send('Hello World')
// })

// router.get('/dashboard', (req,res) =>{
//     res.send('Dashboard')
// })

// adding a new user
router.post('/addCustomer', actions.addNewCustomer)
router.post('/addWorker', actions.addNewWorker)
//login
router.post('/loginCustomer', actions.loginCustomer)
//check email availability
router.post('/checkEmailAvailability', actions.checkEmailAvailability)
//check phone availability
router.post('/checkPhoneAvailability', actions.checkPhoneAvailability)
//upload pro pic
router.post('/uploadProPic', actions.uploadProPic)
router.post('/uploadNicFront', actions.uploadNicFront)
router.post('/uploadNicBack', actions.uploadNicBack)
//get
router.get('/getinfo', actions.getinfo)
// router.get('/getPropic', actions.getPropic)



module.exports = router