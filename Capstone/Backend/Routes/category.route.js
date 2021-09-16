const express = require('express');
const router = express.Router();

const {
    addNewCategory,
    getCategory
} = require('../Controllers/category.controller')

router.post("/create", addNewCategory)
router.get("/get", getCategory)

module.exports = router;