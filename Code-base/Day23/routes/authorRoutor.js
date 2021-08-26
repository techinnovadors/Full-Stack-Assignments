const express = require('express');
const router = express.Router();

const authorModel = require("../models/authorModel")

router.post('/', async (req, res) => {
    console.log(req);

    const {
        author_id,
        author_name,
        booksArray
    } = req.body;

    try {
        const author = await authorModel.create({
            "id": author_id,
            "name": author_name,
            "books": booksArray
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
})


router.get('/', async (req, res) => {
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
})

router.get('/:author_id', async (req, res) => {
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
})

router.get('/getName/:author_id', async (req, res) => {
    const {
        author_id
    } = req.params
    try {
        const authors = await authorModel.find({
            "id": author_id
        }, 'name');
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
});


router.put('/updateName', async (req, res) => {

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
});


router.delete('/:author_id', async (req, res) => {
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
})


router.delete('/', async (req, res) => {

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
})


module.exports = router;