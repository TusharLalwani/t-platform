const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Both the lines are having one and same meaning
//const Schema = mongoose.Schema;
//const { Schema } = mongoose;

//userSchema is going to describe all the properties we have. It will mostly have distinct properties 
const userSchema = new Schema({
    googleId: String,
    googleUserName: String
});

//Collection of all types of user for our application in Mongo
const User = mongoose.model('user', userSchema);

module.exports = User;