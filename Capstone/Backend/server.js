const express = require('express')
const cors = require('cors') //Cross-Origin Resource Sharing

//enable environment file
const dotenv = require('dotenv')
dotenv.config()

const db = require('./database/db')
const app = express()


app.use(cors())
app.use(express.json())

//Start Server Call
app.listen(process.env.PORT, () => {
    console.log(`Listening at http://localhost:${process.env.PORT}`)
})