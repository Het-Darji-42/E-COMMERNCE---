const express = require('express')
const router = express.Router()
const placeOrder = require('../../controllers/OrderControllers/order.controller')
const { adminMiddleware, authMiddleware } = require('../../middleware/authMiddleware')

router.post('/place', authMiddleware,placeOrder)

module.exports = router 