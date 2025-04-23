const express = require('express')
const router = express.Router()
const {placeOrder , getSingleUserAllOrder} = require('../../controllers/OrderControllers/order.controller')
const { adminMiddleware, authMiddleware } = require('../../middleware/authMiddleware')

router.post('/place', authMiddleware,placeOrder)
router.get('/orders', authMiddleware,getSingleUserAllOrder)

module.exports = router 