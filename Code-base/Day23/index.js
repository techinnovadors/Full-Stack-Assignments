const express = require('express');
const app = express();

app.use(express.json());


/**
 * 
 * APIs for a Book Management System 
 * 
 * Book, Author and then Publications
 * 
 * GET  
 *   
 * ## All Books
 * ## Get specific book based on id
 * ## Get specific book based on Category
 * 
 * ## All Authors
 * ## Authors based on a book id
 * 
 * ## All Publications
 * ## Authors Belonging to specific Publication
 * 
 * 
 * ## Get Book based on Author Name.
 * 
 * 
 * 
 */



const db = require("./database/db");
const authorRouter = require("./routes/authorRoutor");
const port = '8080';

app.use("/authors", authorRouter);


//   method is post
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port} `)
});