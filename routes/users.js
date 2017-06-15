const express = require('express');
const router = express.Router();

const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/register',(req,res,next)=>{
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, function(err, res2){
        if (err)
        {
            res.json({result:false, msg:'registered fail'});
        }
        else{
            res.json({result:true, msg:'registered ok'});
        }

    });

});

router.post('/authenticate',(req,res,next)=>{
    res.send('AUTHENTICATE');
});

router.get('/profile',(req,res,next)=>{
    res.send('PROFILE');
});

module.exports = router;