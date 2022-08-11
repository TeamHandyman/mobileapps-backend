const express = require('express')
const actions = require('../methods/actions')
const router = express.Router()

router.get('/', (req,res) =>{
    res.send('Hello World')
})

router.get('/dashboard', (req,res) =>{
    res.send('Dashboard')
})

// adding a new user
router.post('/addCustomer', actions.addNewCustomer)
//login
router.post('/loginCustomer', actions.loginCustomer)
//get
router.get('/getinfo', actions.getinfo)



module.exports = router