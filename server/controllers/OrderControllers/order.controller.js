const cartModel = require("../../model/cartModel/cart.model");
const orderModel = require("../../model/OrederHandling/order.model");
const productModel = require("../../model/ProductModel/product.model");

const placeOrder = async (req, res) => {
  const userid = req.user.authID;
  const { shippingAddress } = req.body;

  const cart = await cartModel
    .findOne({ user: userid })
    .populate("CartItems.product");
  if (!cart) {
    return res.status(200).json({
      message: "Card Does Not Found",
    });
    }
    

    //   const total = cart.total;   // not worked
    let total = 0 
    cart.CartItems.forEach((e) => {
        total += e.product.p_price * e.quantity
    })
    

  const placedOrder = await orderModel.create({
    user: userid,
    cart: cart,
    totalAmount: total,
    shippingAddress: shippingAddress,

  });

  return res.status(201).json({
    message: "Order Placed Successfully",
    placedOrder: placedOrder,
  });
};



module.exports = placeOrder;
