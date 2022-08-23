const mongoose = require("mongoose");
const passport = require("passport");
const { mongoURI } = require("../config/keys");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('../config/keys');
const User = require("../models/user");

//It will use the Mongoid and not the google profile id.
passport.serializeUser((user, done) => {
    done(null, user.id);
    console.log("Serialized...");
});

//Deserialize is used to revert the serialuser action
passport.deserializeUser((id,done) => {
    User.findById(id).then (user => {
        done(null, user);
        console.log("Deserialized...");
    });
});


//Passport.use runs in this code by default
//Saving a copy of Google Id into our mongo database, so calling the user model to save a copy of ids into the DB.

passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken,refreshToken,profile,done) => {
        // console.log("Access Control=> ", accessToken);
        // console.log("Access Refresh=> ", refreshToken);
        // console.log("Profile Data=> ", profile);
        console.log("Id: ", profile.id);
        console.log("Username: ", profile.displayName);
        //model name is user and it has a schema. User performs the task schema. it has one argument to receive for now i.e googleId
        User.findOne({ googleId: profile.id}).then(
            (existingUser) => {
                if (existingUser){
                    console.log("User already exist. No action executed");
                    done(null,existingUser);
                }
                else{
                    new User({
                        googleId: profile.id,
                        googleUserName: profile.displayName
                    }).save().then( user => done(null,user) )
                }
            }
        )
    }
));