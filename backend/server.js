const express = require('express')

//create express app
const app = express()

//listen for reqests
app.listen(4000, () => {
    console.log("Server is running on port" + 4000)
})