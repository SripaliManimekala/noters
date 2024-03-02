//controllers for each delete update post get reqs
const Note = require('../models/noteModel')
const mongoose = require('mongoose')

// get all notes
const getNotes = async(req, res) =>{
    const notes = await Note.find({}).sort({createdAt: -1})

    res.status(200).json(notes)
}

// get a single note
const getNote = async(req, res) => {
    const { id } =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such note-get'})
    }

    const note = await Note.findById(id)

    if(!note) {
        return res.status(404).json({error:'No such note-get'})
    }

    res.status(200).json(note)
}

// create new note
const createNote = async(req, res) =>{
    const {title, content, tags} = req.body

    let emptyFields = []
    if (!title) {
        emptyFields.push('title')
    }
    if(!content) {
        emptyFields.push('content')
    }
    if(!tags) {
        emptyFields.push('tags')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error:'Please fill in all the fields.',emptyFields })
    }

    // add doc to db
    try {
        const note = await Note.create({title, content, tags})
        res.status(200).json(note)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a note

const deleteNote = async (req, res) => {
    const { id } =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such note- delete'})
    }

    const note = await Note.findOneAndDelete({_id: id})

    if(!note) {
        return res.status(400).json({error:'No such note -delete'})
    }

    res.status(200).json(note)
   
}

// update a note

const updateNote = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such note -update'})
    }

    const note = await Note.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!note) {
        return res.status(400).json({error:'No such note -update'})
    }

    res.status(200).json(note)

}

//search a Note
const searchNote = async (req,res) => {
    const { query } = req.query;

    try {

        if (!query) {
            return res.status(400).json({ error: 'Search query is required' });
        }

        const note = await Note.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } },
                { tags: { $regex: query, $options: 'i' } }
            ]
        })

        res.status(200).json(note)

    } catch(error){
        console.error('Error searching notes:', error);
        res.status(400).json({error: error.message})
    }
}



module.exports = {
    getNotes,
    getNote,
    createNote,
    deleteNote,
    updateNote,
    searchNote
}