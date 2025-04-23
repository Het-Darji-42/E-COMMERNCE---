const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    CartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    total: { 
      type: Number,
      required: true,
      default : 0 
    }
  },
  { timestamps: true }
);

const cartModel = mongoose.model("Cart", cartSchema);
module.exports = cartModel;
