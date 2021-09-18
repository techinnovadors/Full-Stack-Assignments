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

const {
    upload
} = require('../middleware/common.middleware');


router.post("/create", isLoggedIn, isAdmin, upload.array('productImages'), addNewProduct)
router.get("/get", getProduct)

module.exports = router;