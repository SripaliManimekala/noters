const express = require('express')
const Note = require('../models/noteModel')

const router = express.Router()

// GET all
router.get('/',(req, res)=>{
    res.json({mssg: 'get all notes'})
})

// GET one by id
router.get('/:id',(req, res)=>{
    res.json({mssg: 'get one'})
})

// POST a new note
router.post('/', async (req,res) => {
    const { title, content, tags } = req.body

    try {
       const note = await Note.create({title, content, tags});  //creates a new
       res.status(200).json(note)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
    
})

// DELETE a note with the given id
router.delete('/:id', (req, res) =>{
    res.json({mssg: 'delete a note'})
})

// UPDATE a note with the given id
router.patch('/:id', (req, res) =>{
    res.json({mssg: 'update a note'})
})

module.exports = router