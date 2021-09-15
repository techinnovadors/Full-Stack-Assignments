const express = require('express');
const router = express.Router();

const {
    signup
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
router.post('/signin', (req, res) => {});


module.exports = router;