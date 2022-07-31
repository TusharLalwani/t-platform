const express = require("express");
const passport = require("passport");
const { googleClientID, googleClientSecret } = require("./config/keys");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('./config/keys');


const app = express();

// app.get('/', (req,res) => {
//     res.send(
//         {
//             Hello: "Buddy",
//             Bye: "Dude",
//         }
//     );
// });

passport.use(new GoogleStrategy(
    {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, () => {
        console.log("Access Control", accessToken)
    }
));

app.get(
    '/auth/google', 
    passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get(
    '/auth/google/callback', 
    passport.authenticate('google')
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);