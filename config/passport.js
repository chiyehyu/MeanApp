const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    //opts.issuer = "accounts.examplesoft.com";
    //opts.audience = "yoursite.net";
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log(jwt_payload);
        User.getUserById(jwt_payload._doc._id, function(err, res2) {
            if (err) {
                return done(err, false);
            }
            if (res2) {
                done(null, res2);
            } else {
                done(null, false);
                // or you could create a new account 
            }
        });
        
        
    }));
};



