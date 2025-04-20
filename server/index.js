const express = require('express')
const dotenv = require('dotenv').config()
const app = require('./app')
const colors = require('colors')

const connectDb = require('./config/db')
connectDb()

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Example app listening on port ${port}` .rainbow)
})
