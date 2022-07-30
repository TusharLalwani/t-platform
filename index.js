const express = require("express");
const app = express();

app.get('/', (req,res) => {
    res.send({Hello : "Buddy"});
});

const PORT = process.env.PORT || 2000;
app.listen(PORT);