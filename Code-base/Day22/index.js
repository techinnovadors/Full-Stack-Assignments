const express = require('express');
const db = require("./database/db");


const app = express();

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


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port} `)
})