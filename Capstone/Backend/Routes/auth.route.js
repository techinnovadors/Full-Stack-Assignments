const express = require('express');
const router = express.Router();

const {
    signup,
    signin
} = require('../Controllers/auth.controller');

const {
    validateSignUpRequest,
    validateSignInRequest,
    isRequestCorrect
} = require('../validators/auth.validator');


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
router.post('/signup', validateSignUpRequest, isRequestCorrect, signup);
router.post('/signin', validateSignInRequest, isRequestCorrect, signin);


module.exports = router;