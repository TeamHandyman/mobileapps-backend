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
router.post('/postJobCustomer', actions.postJobCustomer)
router.post('/addWorker', actions.addNewWorker)
//login
router.post('/loginCustomer', actions.loginCustomer)
router.post('/acceptCustomerJob', actions.acceptCustomerJob)
router.post('/confirmJob', actions.confirmJob)
router.post('/workerUpdateQuotation', actions.workerUpdateQuotation)
router.post('/updateWorkerAdDesc', actions.updateWorkerAdDesc)
router.post('/updateWorkerAdImg', actions.updateWorkerAdImg)
router.post('/createQuotation', actions.createQuotation)
// router.post('/getCustomerJobStatus', actions.getCustomerJobStatus)
router.post('/getAcceptedStateCustomerJob', actions.getAcceptedStateCustomerJob)
router.post('/getQuotationState', actions.getQuotationState)
//check email availability
router.post('/checkEmailAvailability', actions.checkEmailAvailability)
//check phone availability
router.post('/checkPhoneAvailability', actions.checkPhoneAvailability)
//get
router.get('/getEmail', actions.getEmail)
router.get('/getCustomerAds', actions.getCustomerAds)
router.get('/getWorkerAds', actions.getWorkerAds)
router.get('/getConfirmedJobs', actions.getConfirmedJobs)
router.get('/getCustomerNotificationsForJobAccept', actions.getCustomerNotificationsForJobAccept)
router.get('/getCustomerNotificationsForQuotations', actions.getCustomerNotificationsForQuotations)
router.get('/getWorkerNotificationsForQuotationRequests', actions.getWorkerNotificationsForQuotationRequests)
router.get('/getInfo', actions.getInfo)
// router.get('/getPropic', actions.getPropic)

// push notifications
router.get('/sendPushNotification', actions.SendNotification)



module.exports = router