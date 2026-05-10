import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import todoRoutes from './routes/todo.routes.js'

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/todos', todoRoutes)

app.listen(3000, ()=>{
    connectDb();
    console.log('http://localhost:3000/');
    
})
