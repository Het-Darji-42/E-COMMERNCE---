const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    p_name: {
      type: String,
      required: true,
    },
    p_description: {
      type: String,
      required: true,
    },
    p_price: {
      type: Number,
      required: true,
    },
    P_categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    p_stock: {
      type: Number,
      required: true,
      default: 1,
    },
    p_image: [{
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true } 
);

const productModel = mongoose.model('Product', productSchema)
module.exports = productModel