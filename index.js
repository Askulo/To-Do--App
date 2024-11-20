const express = require('express');
const dotenv = require('dotenv')
const cors =require('cors');
const mongoose = require('mongoose');
const Todo = require('./models/Todo')
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();

const app = express();
app.use(express.json());


app.use(cors());
app.use('/api/todos', todoRoutes);




app.get('/', (req, res)=> {
    res.send('Todo App Backend is running');
});

app.get('/test-add-todo', async (req, res)=> {
    try{
        const newTodo = new Todo({title: 'sample task'});
        const savedTodo = await newTodo.save()
        res.status(201).json(savedTodo);
    }catch(err){
        res.status(500).json(err);
    }
})


mongoose.connect(process.env.MONGODB_URL)
.then(()=> console.log('MongoDB connected succesfully'))
.catch(err => console.error('MongoDB connection error', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`))