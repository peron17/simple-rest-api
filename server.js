const express = require('express')
const bp = require('body-parser')
const app = express();
const db = require('./config/db')
// const mongoose = require('mongoose')
const port = process.env.PORT;

app.use(bp.urlencoded({extended: true}))

app.use(bp.json())

app.get('/', (req, res) => {
    res.json({message : 'Welcome to my simple restful api'})
});

require('./app/routes/route')(app);

app.listen(port, () => {
    console.log('Server listening on port ' + port)
})