//Keys.js will decide whether it is Dev environment or Prod...

if(process.env.NODE_ENV === 'production') {
    //Production environment uses key.js
    console.log("Production Executed...");
    module.exports = require("./prod");
} else {
    //Development environment uses dev.js
    console.log("Development Executed...");
    module.exports = require("./dev");
}