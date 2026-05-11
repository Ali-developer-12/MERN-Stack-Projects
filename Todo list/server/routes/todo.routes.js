import express from 'express';
import Todo from '../models/todo.model.js';

const router = express.Router();

router.get('/', async (req, res)=>{
    try{
        const todos = await Todo.find();
        res.json(todos);
    }
    catch(err){
        res.status(500).json({message: err.message});
        
    }
})


router.post("/", async(req, res)=>{
    const todo = new Todo({
        text: req.body.text
    });

    try{
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    }
    catch(err){
        
        res.status(400).json({message: err.message});
    }
});


router.patch('/:id',async(req, res)=>{
    try{
        const todo = await Todo.findById(req.params.id)
        if(!todo) return res.status(401).json({message: "task not found"});

        if(req.body.text !== undefined){
            todo.text = req.body.text;
        }
        if(req.body.completed !== undefined){
            todo.completed = req.body.completed;
    }

        const updateTodo = await todo.save();
        res.json(updateTodo)
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
});

router.delete('/:id', async (req, res)=>{
    try{
        await Todo.findByIdAndDelete(req.params.id);
        res.json('todo deleted')
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

export const todoRoutes = router;