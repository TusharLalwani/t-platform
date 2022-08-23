//Keys.js will decide whether it is Dev environment or Prod...

if(process.env.NODE_ENV === 'production') {
    //Production environment uses key.js
    module.exports = require("./prod");

} else {
    //Development environment uses dev.js
    module.exports = require("./dev");
}