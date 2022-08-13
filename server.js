const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')
const passport = require('passport')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
const multer = require('multer')
const ImageModel = require('./models/proPic')

connectDB()

const app = express()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(routes)
app.use(passport.initialize())
require('./config/passport')(passport)

//Propic storage
const Storage = multer.diskStorage({
    destination:'Propics',
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    },
});

const upload = multer({
    storage:Storage
}).single('testImage')

app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }else{
            const newImage = new ImageModel({
                email: req.body.email,
                image:{
                    data: req.file.filename,
                    contentType:'image/png'
                }
            })
            newImage.save().then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
})


const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
