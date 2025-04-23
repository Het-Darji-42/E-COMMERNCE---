const express = require("express");
const router = express.Router();
const {
  AddToCart,
  RemoveToCart,
  singleUserCart,
  increaseQuantity,
  decreaseQuantity,
} = require("../../controllers/CartControllers/cart.controller");
const {
  adminMiddleware,
  authMiddleware,
} = require("../../middleware/authMiddleware");

router.post("/add/:id", authMiddleware, AddToCart);
router.delete("/remove/:id", authMiddleware, RemoveToCart);
router.get("/items", authMiddleware, singleUserCart);
router.patch("/increase/:id", authMiddleware , increaseQuantity);
router.patch("/decrease/:id", authMiddleware, decreaseQuantity);

module.exports = router;
