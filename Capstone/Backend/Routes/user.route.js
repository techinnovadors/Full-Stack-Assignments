const express = require('express');
const router = express.Router();

const {
    signup,
    signin
} = require('../Controllers/user.controller');

/**
 * route  /signup
 *
 * 
 * @param 
 *  fullname
 *  email
 *  password
 * 
 * 
 */
router.post('/signup', signup);
router.post('/signin', signin);


module.exports = router;