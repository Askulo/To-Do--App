const express = require('express');
const Todo = require('../models/Todo')
const router = express.Router()



//create a new todo

router.post('/add',async (req, res) =>{

    try {
        const newTodo = new Todo({
        title: req.body.title,
    })

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
        
    } catch (err) {
        res.status(500).json({message: 'Failed to create To-Do', error: err});
    }

})


// Get all To-Dos

router.get('/', async (req, res)=>{

    

    try {

        // const todos = await Todo.find();
        const todos = await Todo.find({}, { _id: 1, title: 1, isCompleted: 1 }); // Explicitly include field
        res.status(200).json(todos);
        
    } catch (err) {
        res.status(500).json({message: 'Failed to retrieve To-Dos', error: err});
        
    }
})


// Update a to_do

router.put('/:id', async (req, res) => {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        { isCompleted: req.body.isCompleted }, // Ensure this updates the isCompleted field
        { new: true }
      );
      if (!updatedTodo) return res.status(404).json({ message: 'To-Do not found' });
      res.status(200).json(updatedTodo);
    } catch (err) {
      res.status(500).json({ message: 'Failed to update To-Do', error: err.message });
    }
  });
  

//delete A to do

router.delete('/:id', async (req, res)=> {
    try {
         await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'to do deleted successfully'});
        
    } catch (err) {
        res.status(400).json({message: 'Failed to update To-Do', error: err});
        
    }
})


module.exports = router;