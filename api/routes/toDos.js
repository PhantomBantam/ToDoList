const express = require('express');
const ToDo = require('../models/ToDo');

const router = express.Router();

router.get('/', async (req, res)=>{
  try{
    let data = await ToDo.find();
    res.status(201).json(data);
  }catch(err){
    res.status(500).json(err);
  }
});
 
router.get('/:toDoTitle', async (req, res)=>{
  try{
    let data = await ToDo.findOne({title:req.params.toDoTitle});
    res.status(201).json(data);
  }catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res)=>{
  try{

    //check data for discrepencies
    if(req.body.title == '' || req.body.description == '' ||req.body.date == '' || req.body.finished == ''){
      return res.send("FORM INCOMPLETE");
    }

    let newToDo = new ToDo({
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
      finished: req.body.finished
    });

    console.log(req.body.finished);

    console.log(newToDo);
 
    let data = await newToDo.save();
    res.status(201).json(data);
  }catch(err){
    res.status(500).json(err);
  }
});

router.patch('/', async (req, res)=>{
  try{

    if(req.body.title == '' || req.body.description == '' ||req.body.date == '' || req.body.finished == ''){
      return res.send("FORM INCOMPLETE");
    }

    let data = await ToDo.updateOne({title:req.body.title}, {
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
      finished: req.body.finished
    });

    res.status(201).json(data);
  }catch(err){
    res.status(500).json(err);
  }
});

router.delete('/', async (req, res)=>{
  try{
    let data = await ToDo.remove({title:req.body.title});
    res.status(201).json(data);
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;