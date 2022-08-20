const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')
const passport = require('passport')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
const multer = require('multer')
const ImageModel = require('./models/proPic')
const cloudinary = require('cloudinary');

connectDB()

cloudinary.config({
    cloud_name: 'projecthandyman',
    api_key: '461133995855746',
    api_secret: '-QpKX775LFGsnxH4csUfswOTQl4',
})

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
// const Storage = multer.diskStorage({
//     destination:'Propics',
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname);
//     },
// });

// const upload = multer({
//     storage:Storage
// }).single('testImage')

app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }else{
            cloudinary.v2.uploader.upload('E:/UCSC/3rd Year/1st Sem/SCS 3214 - Group Project II/Handymanmobile-backend/Propics/download.png',
                { public_id: 'asd' }, 
                function(error, result) {console.log(result); });
            const encoded = req.body.encoded;
            let base64 = encoded.toString('base64');
            let propic = new Buffer(base64, 'base64');
            const newImage = new ImageModel({
                email: req.body.email,
                image: propic
            })
            newImage.save().then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
})


const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
