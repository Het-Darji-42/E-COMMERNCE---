const express = require('express')
const app = express()
const authRoutes = require('./routes/Auth/authRoutes')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/api/v1/auth' , authRoutes)

module.exports = app 
