const express = require("express");
const app = express();

app.get('/', (req,res) => {
    res.send(
        {
            Hello: "Buddy",
            Bye: "Dude",
            Deta: process.env.PORT
        }
    );
});

const PORT = process.env.PORT || 4000;
app.listen(PORT);