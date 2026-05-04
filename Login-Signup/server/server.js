const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/user')

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mern-projects');

app.post('/login', (req, res)=>{

    const{email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user=>{
        if(user){
            if(user.password = password){
                res.json('successfully login')
            }
            else{
                res.json('password is incorrect')
            }
        }
        else{
            res.json("user not exist")
        }
    })
})

app.post('/register', (req, res)=>{
    UserModel.create(req.body)
    .then(user=> res.json(user))
    .catch(err=> res.json(err))
})

app.listen(3000, ()=>{
    console.log('http://localhost:3000/');
    
})


