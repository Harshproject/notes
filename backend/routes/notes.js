const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");


router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("some error occured");
  }
});
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ result: result.array() });
      }
      const { title, description, tags } = req.body;
      const note = new Notes({
        title,
        description,
        tags,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json({ note });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("some error occured");
    }
  }
);

router.put('/updatenote/:id',fetchuser,[
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],async(req,res)=>{
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() });
        }
        const { title, description, tags } = req.body;
        const newNote={};
        if(title){
            newNote.title=title
        }
        if(description){
            newNote.description=description;
        }
        if(tags){
            newNote.tags=tags;
        }
        let note=await Notes.findById(req.params.id);
        if(!note){res.status(404).send("Not Found")};
        if(note.user.toString() !== req.user.id){
            res.status(401).send("Not Allowed")
        }

        note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note})
    } catch (err) {
        console.log(err.message);
        res.status(500).send("some error occured");
      }
})

router.delete('/delete/:id',fetchuser,async(req,res)=>{
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() });
        }
        const { title, description, tags } = req.body;
        
    
        let note=await Notes.findById(req.params.id);
        if(!note){res.status(404).send("Not Found")};
        if(note.user.toString() !== req.user.id){
            res.status(401).send("Not Allowed")
        }

        note=await Notes.findByIdAndDelete(req.params.id)
        res.json({"success":"note id has been deleted"})
    } catch (err) {
        console.log(err.message);
        res.status(500).send("some error occured");
      }
})

module.exports = router;
