const express = require('express');
const router = express.Router();

const {
    addNewProduct,
    getProduct
} = require('../Controllers/product.controller')

const {
    isLoggedIn,
    isAdmin
} = require('../middleware/auth.middleware');


// const {
//     validateCreateProductRequest,
//     isRequestCorrect
// } = require('../middleware/request.validator');


router.post("/create", isLoggedIn, isAdmin, addNewProduct)
router.get("/get", getProduct)

module.exports = router;