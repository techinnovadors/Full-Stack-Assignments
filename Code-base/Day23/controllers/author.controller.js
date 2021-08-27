const {
    checkUndefNul,
    validateEmail,
    validateNumber
} = require('../helpers/validation.helper')

const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")

const addAuthor = async (req, res) => {
    console.log(req);

    const {
        id,
        age,
        name,
        email,
        contact_number,
        country,
        gender,
        books_published,
        publications_associated
    } = req.body;

    var errorMessage = [];



    if (checkUndefNul(id)) {
        errorMessage.push("ID is invalid");
    }

    if (checkUndefNul(age) || age <= 0) {
        errorMessage.push("Age is invalid");
    }

    if (checkUndefNul(name)) {
        errorMessage.push("Name is invalid");
    }

    if (checkUndefNul(country)) {
        errorMessage.push("Country is invalid");
    }

    if (!validateEmail(email)) {
        errorMessage.push("Email is invalid");
    }

    if (!validateNumber(contact_number)) {
        errorMessage.push("Contact Number is invalid");
    }

    if (!["male", "female", "others"].includes(gender.toLowerCase()) || checkUndefNul(gender)) {
        errorMessage.push("Gender is invalid");
    }


    /***
     *  Validate Books_publication and publications_associated
     * 
     * 
     *  if there is a book published 1st check if it's in book collection 
     *    false if not present. 
     *  
     * if yes, check publication of that book. map it with publications_associated.
     */


    try {

        if (errorMessage.length > 0) {
            res.json({
                data: errorMessage,
                message: "Invalid Params sent"
            })
        }


        const author = await authorModel.create({
            ...req.body
        });

        res.json({
            data: author,
            message: "Successfull"
        });
    } catch (error) {
        res.json({
            data: [],
            message: error
        });
    }
}

const getAuthors = async (req, res) => {
    try {
        const authors = await authorModel.find({});
        res.json({
            data: authors,
            message: "Successfull"
        });
    } catch (error) {
        res.json({
            data: [],
            message: error
        });
    }
}

const getAuthorbyId = async (req, res) => {
    const {
        author_id
    } = req.params
    try {
        const authors = await authorModel.find({
            "id": author_id
        }, '-_id -__v');
        res.json({
            data: authors,
            message: "Successfull"
        });
    } catch (error) {
        res.json({
            data: [],
            message: error
        });
    }
}

const getBooksofAuthor = async (req, res) => {
    const {
        author_id
    } = req.params
    try {
        const books_published = await authorModel.find({
            "id": author_id
        }, 'books_published  -_id -__v');

        console.log(books_published);

        //  get all books whose id is present IN books_published
        const books_data = await bookModel.find({
            id: {
                $in: books_published
            }
        })

        res.json({
            data: books_data,
            message: "Successfull"
        });
    } catch (error) {
        res.json({
            data: [],
            message: error
        });
    }
}

const updateAuthorName = async (req, res) => {

    const {
        author_name,
        author_id
    } = req.body
    try {
        const authors = await authorModel.updateMany({
            "id": author_id
        }, {
            "name": author_name
        });
        res.json({
            data: authors,
            message: "Successfull"
        });
    } catch (error) {
        res.json({
            data: [],
            message: error
        });
    }
}

const deleteAuthorbyId = async (req, res) => {
    const {
        author_id
    } = req.params
    try {
        const authors = await authorModel.deleteOne({
            "id": author_id
        });
        res.json({
            data: authors,
            message: "Successfull"
        });
    } catch (error) {
        console.log(error)
        res.json({
            data: [],
            message: error
        });
    }
}

const deleteAllAuthors = async (req, res) => {

    try {
        const authors = await authorModel.deleteMany({});
        res.json({
            data: authors,
            message: "Successfull"
        });
    } catch (error) {
        console.log(error)
        res.json({
            data: [],
            message: error
        });
    }
}

module.exports = {
    addAuthor,
    getAuthors,
    getAuthorbyId,
    getBooksofAuthor,
    updateAuthorName,
    deleteAuthorbyId,
    deleteAllAuthors
}