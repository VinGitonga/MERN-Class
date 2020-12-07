const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
//const authRoutes = require('./routes/auth.routes')
const courseRoutes = require('./routes/course.routes');
const config = require('./config/config');

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then(() => console.log("Connected to MongoDB"))

mongoose.connection.on('error', () =>{
    throw new Error(`Unable to connect to database : ${config.mongoUri}`)
})


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

app.use(cors()) //enable Cross Origin Resource Sharing

app.use('/',userRoutes)
app.use('/',courseRoutes)
//app.use('/',authRoutes)



app.listen(config.port, (err)=>{
    if(err){
        console.log(err)
    }

    console.info('Server started on port %s. ',config.port)
})