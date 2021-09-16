const express = require('express')
const cors = require('cors') //Cross-Origin Resource Sharing
const dotenv = require('dotenv')

//enable environment file
dotenv.config()

const db = require('./database/db')
const app = express()

app.use(cors())
app.use(express.json())

const indexRoutes = require('./Routes/index.route')
app.use('/api', indexRoutes);

//Start Server Call
app.listen(process.env.PORT, () => {
    console.log(`Listening at http://localhost:${process.env.PORT}`)
})