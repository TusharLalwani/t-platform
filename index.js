//Initialization state to load all the libraries and functions
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const cookieSession = require("cookie-session");
const mongoose=  require("mongoose");
const keys = require('./config/keys');
const passport = require("passport");
// require("./models/user");
require("./services/passport");

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
console.log("Initialisation completed...");
app.use(passport.session());
console.log("Session completed...");

//connect mongoose to our connection with a weblink currently in keys file
mongoose.connect(keys.mongoURI, () => {
    console.log("MongoDB connected");
});

//It is used to route to the google oauth 2.0 so a user can be able to sign up using google credentials.Its parameters are in Keys file.
authRoutes(app);

/*
Also we can use this instead of calling require on the top and passing back the value

const app = express();

require("./routes/authRoutes")(app);

*/

// app.get('/', (req,res) => {
//     res.send(
//         {
//             Hello: "Buddy",
//             Bye: "Dude",
//         }
//     );
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT);