const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getSingleUserAllOrder,
  updateStatus,
  getAllOrder
} = require("../../controllers/OrderControllers/order.controller");
const {
  adminMiddleware,
  authMiddleware,
} = require("../../middleware/authMiddleware");

router.post("/place", authMiddleware, placeOrder);
router.get("/orders", authMiddleware, getSingleUserAllOrder);
router.put("/updateStatus/:orderId", adminMiddleware, updateStatus);
router.get('/allOrders' , adminMiddleware , getAllOrder)

// router.post('/singleProductOrder/:id', authMiddleware,orderSingleProduct)

module.exports = router;
