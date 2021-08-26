const express = require('express');
const app = express();

app.use(express.json());

const db = require("./database/db");
const authorRouter = require("./routes/authorRoutor");
const port = '8080';

app.use("/authors", authorRouter);


//   method is post
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port} `)
})  