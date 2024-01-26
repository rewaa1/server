require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')

const app = express();
const workout = require('./routes/work')
const user =require('./routes/user')

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

app.use('/api/workout', workout)
app.use('/api/user', user)

mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        app.listen(process.env.PORT ,() =>{
            console.log('connected to db & listining on port', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })
