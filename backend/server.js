require('dotenv').config()

const express = require('express')
const noteRoutes  = require('./routes/notes')


//create express app
const app = express()

//middleware
app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/notes', noteRoutes)

//listen for reqests
app.listen(process.env.PORT, () => {
    console.log("Server is running on port" , process.env.PORT);
})