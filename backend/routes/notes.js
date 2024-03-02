const express = require('express')

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
router.post('/', (req,res) => {
    res.json({mssg: 'post a note'})
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