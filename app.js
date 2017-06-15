const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const users = require('./routes/users');

const mongoose = require('mongoose');
const config = require('./config/database');
mongoose.connect(config.database);
//add event
mongoose.connection.on('connected',()=>{
    console.log('mongoose connected to ' + config.database);
});
mongoose.connection.on('error',(err)=>{
    console.log('mongoose error: ' + err);
});

const app = express();
const port = 3000;

app.use(bodyParser.json()); //use body-parser middleware
app.use(cors());    //use cors middleware

//add static folder
app.use(express.static(path.join(__dirname,'public')));

//add passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//add routes to /users
app.use('/users',users);


app.get('/',(req,res)=>{
    res.send('invalid endpoint');
});

app.listen(port, ()=>{
    console.log('server started on port ' + port);
});
