const express = require('express');
const router = express.Router();

const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

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
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, resUser)=>{
        if (err) throw err;
        if (!resUser) return res.json({result:false,msg:'User not found'});

        //user found
        User.comparePassword(password, resUser.password, (err, isMatch) => {
            if(err) throw err;
            if (!isMatch) return res.json({result:false,msg:'User wrong password'});
            else
            {
                const token = jwt.sign(resUser,config.secret,{expiresIn:60*60*24*7});//one week expiration
                res.json({
                    result: true,
                    token: 'JWT '+ token,
                    user:{
                        id: resUser._id,
                        name: resUser.name,
                        username: resUser.username,
                        email: resUser.email
                    }
                });
            }
        });
    });


});

//router.get('/profile',(req,res,next)=>{
//protect route by passport
router.get('/profile', passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.json({
        result: true,
        user:{
            id: req.user
        }
    });
});

module.exports = router;