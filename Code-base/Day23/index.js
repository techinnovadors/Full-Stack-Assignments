const express = require('express');
const app = express();
const cors = require("cors");


app.use(cors());
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
 * Post
 * ## Add New Author 
 * ## Add new Book
 * ## Add new Publication
 * 
 * Put
 * ## Add new book to an author 
 *      book should have that author id in authors array.
 *      update the publication as well
 * 
 * ## Add 
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