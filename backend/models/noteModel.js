const mongoose = require('mongoose')

const Schema = mongoose.Schema

//define the stucture
const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: [String]
}, { timestamps: true })

module.exports = mongoose.model("Note", noteSchema)