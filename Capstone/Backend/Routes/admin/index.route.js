const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route')

router.use("/", authRoutes)
module.exports = router;