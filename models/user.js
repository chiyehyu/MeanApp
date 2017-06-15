const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const UserSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type: String,
        required: true

    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User',UserSchema);

//can also use the following, if not directly using User outside
//const User = mongoose.model('users',UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback){
    const condition = {username: username};
    User.findOne(condition, callback);
};

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            // Store hash in your password DB.
            if(err) throw err;  //app will crash         
            newUser.password = hash;
            newUser.save(callback);// because newUser is new from model, can be saved to db directly
        });
    });
};

module.exports.comparePassword = function(candidatePwd, hash, callback){
    bcrypt.compare(candidatePwd, hash, (err, isMatch)=>{
        if (err) throw err;        
        callback(null, isMatch);
    });
};