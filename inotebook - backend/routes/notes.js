const express = require('express')
const router = express.Router()
var  fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/notes')
const { body, validationResult } = require('express-validator');

router.get('/getalluser',fetchuser,async(req,res)=>{
    try {
   const notes = await Notes.find({user:req.user.id})
   res.json(notes)
    }
   catch (error) {
    console.log(error.message);
    res.status(400).send({ error: "Internal Server Error" })   
}
})

router.post('/addnote',fetchuser, [
    body('title', "Enter a vaild title").isLength({ min: 3 }),
    body('description', "Description must be atleast 5 characters").isLength({ min: 5 }),
  ], async (req, res) => {
    try {     
    const {title,description,tag} = req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Notes({
        title,description,tag,user:req.user.id
      })
    const saveNote = await note.save()
    res.json(saveNote)
} catch (error) {
    console.log(error.message);
    res.status(400).send({ error: "Internal Server Error" })   
}
  })
module.exports=router