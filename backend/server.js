require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const noteRoutes  = require('./routes/notes')
const e = require('express')


//create express app
const app = express()

//middleware
app.use(express.json() ) //looks for if there is json body to requests and attach it to req object
app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/notes', noteRoutes)

//connect db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for reqests
        app.listen(process.env.PORT, () => {
        console.log("connected to db and listening on port" , process.env.PORT);
        }) 
    })
    .catch((error) => {
        console.log(error)
    })

