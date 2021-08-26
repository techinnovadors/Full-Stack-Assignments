const express = require('express');
const db = require("../database/db");
const router = express.Router();

const authorModel = require("../models/authorModel")

// 
router.post('/', async (req, res) => {
    console.log(req);

    const {
        authorData
    } = req.body;

    try {
        const author = await authorModel.create(authorData);
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
