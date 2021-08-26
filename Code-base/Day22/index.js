const express = require('express');
const db = require("./database/db");
// const bodyParser = require('body-parser');

const app = express();

// parse application/json
app.use(express.json())
const port = '8000';

/**
 * 
 * APIs for a Book Management System 
 * 
 * Book, Author and then Publications
 * 
 * GET  
 *   
 * ## All Books
 * ## Get specific book based on ISBN
 * ## Get specific book based on Category
 * 
 * ## All Authors
 * ## Authors based on a book isbn
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


app.get("/", (req, res) => {
    res.send("Welcome to Book Management APIs")
})

/**
 * 
 *  @route /books?book_id=&category=
 *  @description "API To Get All Books"
 *  @method GET
 *  @params book_id  string  --> Query Params
 *          category string  --> Query Params
 *  @return_Type JSON Object
 * 
 */

app.get("/books", (req, res) => {
    var books = db.books;

    const {
        book_id,
        category
    } = req.query;


    console.log(book_id, category);


    if (book_id !== undefined) {
        books = books.filter(book => book.book_id === book_id);
    }

    if (category !== undefined) {
        books = books.filter(book => book.category.includes(category));
    }

    var responseObj = {};
    if (books.length == 0) {
        responseObj = {
            data: {},
            message: `No book found for the BOOK ID of ${category}`,
            status: 404
        }
    } else {
        responseObj = {
            data: books,
            message: `Found ${books.length} BOOKs beloning to ${category}`,
            status: 200
        }
    }
    res.json(responseObj);
})


app.post('/books', (req, res) => {
    console.log(req);

    const {
        book
    } = req.body;
 
    
    if (db.books === undefined) db.books = [book];
    else db.books.push(book);
    res.json(db.books);
})



app.post('/authors', (req, res) => {
    console.log(req);

    const {
        author
    } = req.body;

    if (db.authors === undefined) db.authors = [author];
    else db.authors.push(author);
    res.json(db.authors);
})

/**
 * 
 *  @route /books/id/:book_id
 *  @description "API To Get Book by BOOK_ID"
 *  @method GET
 *  @params book_id -- Route Param
 *  @return_Type JSON Object
 * 
 */


app.get("/books/id/:book_id", (req, res) => {
    const {
        book_id
    } = req.params;


    var result = db.books.filter(book => book.book_id === book_id);
    console.log(result);

    var responseObj = {};

    if (result.length == 0) {
        responseObj = {
            data: {},
            message: `No book found for the BOOK ID of ${book_id}`,
            status: 404
        }
    } else {
        responseObj = {
            data: result,
            message: `${result[0].title} found for the BOOK ID of ${book_id}`,
            status: 200
        }
    }
    res.json(responseObj);
})


/**
 * 
 *  @route /books/category/:category
 *  @description "API To Get All of Books based category"
 *  @method GET
 *  @params category -- Route Param
 *  @return_Type JSON Object
 * 
 */


app.get("/books/category/:category/author/:author", (req, res) => {
    const {
        category
    } = req.params;

    var result = db.books.filter(book => book.category.includes(category));
    console.log(result);

    var responseObj = {};

    if (result.length == 0) {
        responseObj = {
            data: {},
            message: `No book found for the BOOK ID of ${category}`,
            status: 404
        }
    } else {

        var titles;
        for (let i = 0; i < result.length; i++)
            titles += " " + result[i].title;

        responseObj = {
            data: result,
            message: `Found ${titles} BOOKs belonging to ${category}`,
            status: 200
        }
    }
    res.json(responseObj);
})



app.get("/authors/publications/:publisher_id", (req, res) => {
    const {
        publisher_id,
    } = req.params;


    var publisher = db.publications.filter((publisher) => publisher.id == publisher_id)[0],
        result = [];

    /***
     * AL*ABL*PBL 
     * 
     * */
    for (let i = 0; i < db.authors.length; i++) {
        const author = db.authors[i];
        console.log(author);
        if (author.books.some(item => publisher.books.includes(item)))
            result.push(author);

        // for (let j = 0; j < author.books.length; j++) {
        //     if (publisher.books.includes(author.books[i])) {
        //         result.push(author);
        //         break;
        //     }
        // }
    }

    var responseObj = {};
    if (result.length == 0) {
        responseObj = {
            data: {},
            message: `No authors found for publisher of ${publisher.name}`,
            status: 404
        }
    } else {
        responseObj = {
            data: result,
            message: `${result.length} authors found for book ID of ${publisher.name}`,
            status: 200
        }
    }

    res.json(responseObj);
})





/*********** post *************
 * 
 * 
 * /BOOK/NEW
 * /AUTHOR
 * /PUBLICATION
 * 
 * 
 * 
 * 
 * 
 * 
 */








app.listen(port, () => {
    console.log(`Listening at http://localhost:${port} `)
})