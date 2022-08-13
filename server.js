const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')
const passport = require('passport')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
const multer = require('multer')
const model = require('./models/testmodel')

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

app.use('/uploads', express.static(__dirname +'/uploads'));

//Propic storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
  },
  
  filename: function (req, file, cb) {
  cb(null, new Date().toISOString()+file.originalname)
  }
  })
  
  var upload = multer({ storage: storage })
  
  app.post('/upload', upload.single('myFile'), async(req, res, next) => {
  
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
  
    return next("hey error")
  }
  
  const imagepost= new model({
  image: file.path
  })
  
  const savedimage= await imagepost.save()
  res.json(savedimage)
  
  })
  
  app.get('/image',async(req, res)=>{
   const image = await model.find()
   res.json(image)
  
  })


const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
