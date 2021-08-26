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





module.exports = router;