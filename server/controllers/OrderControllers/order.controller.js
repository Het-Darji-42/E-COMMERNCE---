const cartModel = require("../../model/cartModel/cart.model");
const orderModel = require("../../model/OrederHandling/order.model");
const productModel = require("../../model/ProductModel/product.model");

const placeOrder = async (req, res) => {
  try {
    const userid = req.user.authID;
    const { address } = req.body;

    //cart malyu badhuj : with product id : pun apde only id nai details pan joiye chhe atle apde teni products ne detils mangi
    const cart = await cartModel
      .findOne({ user: userid })
      .populate("CartItems.product");
    if (!cart) {
      return res.status(404).json({
        message: "Cart Does Not Found",
      });
    }

    let total = 0;
    for (let item of cart.CartItems) {
      total += item.product.p_price * item.quantity;

      //check product stock
      if (item.product.p_stock >= item.quantity) {
        let productStock = item.product.p_stock - item.quantity;
        await productModel.findByIdAndUpdate(item.product._id, {
          p_stock: productStock,
        });
      } else {
        return res.status(400).json({
          message: `not enough stock available for your orderd item : ${item.product.p_name}`,
        });
      }
    }

    const newOrderData = {
      cart: cart,
      totalAmount: total,
      shippingAddress: address,
    };
    const existedOrder = await orderModel.findOne({ user: userid }).populate({
      path: "order.cart",
      populate: {
        path: "CartItems.product",
        model: "Product",
      },
    });
    if (existedOrder) {
      existedOrder.order.push(newOrderData);
      await existedOrder.save();
      return res.status(201).json({
        message: "Order Placed Successfully",
        order: existedOrder,
      });
    } else {
      const createNewUser = await orderModel.create({
        user: userid,
        order: [newOrderData],
      });
    }
    return res.status(201).json({
      message: "New Order placed successfully",
      order: placeOrder,
    });

    // const placedOrder = await orderModel.create({
    //     user: userid,
    //     order: [
    //         {
    //             cart: cart,
    //             totalAmount: total,
    //             shippingAddress: address,
    //         },
    //     ],
    // });

    // return res.status(201).json({
    //     message: "Order Placed Successfully",
    //     placedItems : placedOrder
    // })
  } catch (error) {
    return res.status(500).json({
      message: "Server Side Error",
      error: error.message,
    });
  }
};

const getSingleUserAllOrder = async (req, res) => {
  try {
    const userid = req.user.authID;
    const products = await orderModel.findOne({ user: userid }).populate({
      path: "order.cart",
      populate: {
        path: "CartItems.product",
        model: "Product",
      },
    });
    if (!products) {
      return res.status(404).json({
        message: "No Order Founded",
      });
    }
    res.status(200).json({
      message: "Total Order Fetched",
      totalOrder: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Side Error",
      error: error.message,
    });
  }
};


const getAllOrder = async (req, res) => { 
  try {
    const allOrderData = await orderModel.find()

    let allOrder = [];

    allOrderData.forEach((userOrder) => { 
      const userId = userOrder.user;

      userOrder.order.forEach((singleProduct) => { 
        allOrder.push({
          ...singleProduct._doc,
          user: userId,
        })
      })
    })

    return res.status(200).json({
      message: "All Orders Fetched Successfully",
      totalOrders: allOrder.length,
      orders: allOrder,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server Side Error",
      error : error.message
    })
  }
}


const updateStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { newStatus } = req.body;
    
    const userOrder = await orderModel.findOne({ "order._id": orderId });
    if (!userOrder) {
      return res.status(404).json({
        message: "Order not found in any user’s order list",
      });
    }

    const singleOrder = userOrder.order.find(
      (ord) => ord._id.toString() === orderId
    );

    if (!singleOrder) {
      return res.status(404).json({
        message: "No Any Order Id Found Inside Orders",
      });
    }

    singleOrder.orderStatus = newStatus;
    await userOrder.save();

    return res.status(200).json({
      message: "Order status updated successfully",
      updatedOrder: singleOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};




module.exports = { placeOrder, getSingleUserAllOrder, updateStatus , getAllOrder};
