const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs')
const db = require('knex')({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'barisarabasuren',
        password : '',
        database : 'face-recognition'
    }
});

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(cors())

const { handleRegister } = require('./controllers/register');
const { handleSignin } = require('./controllers/signin');
const { handleProfileGet } = require('./controllers/profile');
const { handleImage } = require('./controllers/image');
const { handleApiCall } = require('./controllers/api.js');

app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { handleImage(req, res, db) })

app.post('/clarifai', (req, res) => { handleApiCall(req, res) })

var port = process.env.PORT || 3000

app.listen(port || 3000, () => {
    console.log(`app is running on port ${port}`)
})