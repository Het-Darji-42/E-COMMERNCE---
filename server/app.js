const express = require('express')
const app = express()
const authRoutes = require('./routes/Auth/authRoutes')
const categoryRoutes = require('./routes/Category/categoryRoutes')
const productRoutes = require('./routes/Product/productRoutes')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use('/api/v1/auth' , authRoutes)
app.use('/api/v1/category' , categoryRoutes)
app.use('/api/v1/product' , productRoutes)

module.exports = app 
