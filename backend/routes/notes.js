const express = require('express')
const {
    createNote,
    getNotes,
    getNote,
    deleteNote,
    updateNote,
    searchNote
} = require('../controllers/noteController')

const router = express.Router()

// GET all
router.get('/', getNotes)

// Define a route for searching notes
router.get('/search', searchNote);

// GET one by id
router.get('/:id', getNote)

// POST a new note
router.post('/', createNote)

// DELETE a note with the given id
router.delete('/:id', deleteNote)

// UPDATE a note with the given id
router.patch('/:id', updateNote)


module.exports = router