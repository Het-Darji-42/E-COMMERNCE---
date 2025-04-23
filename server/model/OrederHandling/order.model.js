const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: [
      {
        cart: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Cart",
          required: true,
        },
        totalAmount: {
          type: Number,
          required: true,
        },

        shippingAddress: {
          house_Number: { type: Number, required: true },
          street: { type: String, required: true },
          city: { type: String, required: true },
          state: { type: String, required: true },
          pincode: { type: Number, required: true },
          country: { type: String, default: "India", required: true },
        },
        orderStatus: {
          type: String,
          enum: ["pending", "out for delivery", "delivered"],
          default: "pending",
        },
        orderedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
