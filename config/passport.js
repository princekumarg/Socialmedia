const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User=require('../models/User');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField:'email'},(email,password,done)=>{
        User.findOne({email:email.toLowerCase()},(err,user)=>{
            if(err){
                return done(err);
            }
            if(!user){
                return done(null,false,{msg:`Email not ${email} registered`});
            }
            if(!user.password){
                return done(null,false,{msg:'Invalid email or password'});
            }
            user.comparePassword(password,(err,isMatch)=>{
                if(err){
                    return done(err);
                }
                if(isMatch){
                    return done(null,user);
                }
                return done(null,false,{msg:'Invalid email or password'});
            });
        });
    })
)
passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>
        done(err,user));
    });
};
