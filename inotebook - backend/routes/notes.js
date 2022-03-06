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
router.put('/updatenote/:id',fetchuser, async (req, res) => { 
    const {title,description,tag} = req.body
    const newNote = {}
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};
    let notes = await Notes.findById(req.params.id);
    if(!notes){
      return res.status(404).send("Not Found");
    }
    if(notes.user.toString() !== req.user.id ){
      return res.status(401).send("Not Allowed");
    }
    notes = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{newNote:true});
    res.json({notes});
})
router.delete('/deletenote/:id',fetchuser, async (req, res) => { 
  let notes = await Notes.findById(req.params.id);
  if(!notes){
    return res.status(404).send("Not Found");
  }
  if(notes.user.toString() !== req.user.id ){
    return res.status(401).send("Not Allowed");
  }
  notes = await Notes.findByIdAndDelete(req.params.id);
  res.json({"Success":"Your Note has been deleted",notes:notes});
})


module.exports=router