const express = require('express')
const productModel = require('../../model/ProductModel/product.model')
const userModel= require('../../model/UserModel/user.model');
const cartModel = require('../../model/CartModel/cart.model');
const AddToCart = async (req, res) => { 
    try {
        const { id } = req.params;
        const userId = req.user.authID

        //find user and product

        const isExisted = await productModel.findById({ _id: id })
        if (!isExisted) {
            return res.status(404).json({
                message: "Actually There Is No Product Listed In Product List"
            })
        }

        let cart = await cartModel.findOne({ user: userId })  // cart find karo jya user = userId hoy
        if (!cart) {
            cart = new cartModel({
                user: userId,
                CartItems: []
            });
        }

        //cart means , apde ek user ni anadar jata rahya , ani pehla na function ni madad thi
        const findProductIndex = cart?.CartItems.findIndex(item => item.product.toString() === id)
        //-1 means not found in findIndex method
        if (findProductIndex > -1) {
            cart.CartItems[findProductIndex].quantity += 1;

        } else { 
            cart.CartItems.push({
                product: id,
                quantity : 1 
            })
        }

        const updatedProduct = await cart.save()

        return res.status(201).json({
            message: "Product Added To Cart",
            product : updatedProduct
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server Side Error",
            error : error.message 
        })
    }
}
const RemoveToCart = async (req, res) => { 
    try {
        const userid = req.user.authID;
        const { id } = req.params;
       
        const cart = await cartModel.findOne({ user: userid })
        if (!cart) {
            return res.status(404).json({
                message : "Ther Is No Product In Your Cart"
            })
        }

        const isExistedProduct = cart.CartItems.some(chacha => chacha.product.toString() === id)
        if (!isExistedProduct) {
            return res.status(404).json({
                message: "There is no product in your cart with this product_Id"
            })
        }

        //only filter lagavi ne matched id sivay badhu rakhiyu 
        const updatedCartItems =await cart?.CartItems.filter(chacha => chacha.product.toString() !== id)

        cart.CartItems = updatedCartItems

        const updateCart = await cart.save()

        res.status(200).json({
            message: "Cart Ite Remove Sucessfully",
            removed_item : updateCart
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Side Error",
            error : error.message 
        })
    }
}

const singleUserCart = async (req, res) => {
    try {
        const userId = req.user.authID;
    const cart = await cartModel.findOne({ user: userId }).populate('CartItems.product')
    
    if (!cart) {
        return res.status(404).json({
           message : "User Cart Not Found"
        })
    }

    //is Product Exist ? then add 

    const availableProductStack = []
    for(const item of cart.CartItems) {
        const isAvailableProduct = await productModel.findById(item.product)
        if (isAvailableProduct) {
             availableProductStack.push(item)
        }
    }

    // If we removed any invalid products, save the updated cart

    if (availableProductStack.length !== cart.CartItems.length){
        cart.CartItems = availableProductStack
        await cart.save()
    }
    
    if (availableProductStack.length <= 0) {
        return res.status(200).json({
            message : "There Is No Product Available In Your Cart"
        })
    }

    // if (cart?.CartItems.length === 0) {
    //     return res.status(404).json({
    //         message : "THERE IS NO ONE PRODUCT IN YOUR CART"
    //     })
    // }

    res.status(200).json({
        message: "Cart item fetched successfully",
        product : cart
    })
    } catch (error) {
        return res.status(500).json({
            message: "Server Side Error",
            error : error.message
        })
    }
}

const increaseQuantity = async (req, res) => { 
    try {
        const { id } = req.params;
        const userId = req.user.authID;

        const cart = await cartModel.findOne({ user: userId }).populate('CartItems.product')
        if (!cart) {
            return res.status(404).json({
                message : "There is no user cart here : cart not found"
            })
        }

        const findProductIndex = cart?.CartItems.findIndex(item => item.product._id.toString() === id)
        if (findProductIndex > -1) {
            cart.CartItems[findProductIndex].quantity += 1 
            const updatedCart =await cart.save()

            return res.status(200).json({
                message: "Quantity Icreased",
                product : cart
            })
        } else {
            return res.status(404).json({
                message : "Product Does Not Found In The Cart" 
            })
        }
      


    } catch (error) {
        return res.status(500).json({
            message: "Server Side Error",
            error : error.message
        })
    }
}

const decreaseQuantity = async (req, res) => {
    try {
        const userId = req.user.authID;
        const { id } = req.params;

        const cart = await cartModel.findOne({ user: userId }).populate('CartItems.product')
        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const findProductIndex = cart.CartItems.findIndex(item => item.product._id.toString() === id);

        if (findProductIndex === -1) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        const productItem = cart.CartItems[findProductIndex];

        if (productItem.quantity > 1) {
            productItem.quantity -= 1;
            const updatedCart = await cart.save(); // Make sure to await this
            return res.status(200).json({
                message: "Product quantity decreased",
                cart: updatedCart
            });
        } else {
            return res.status(200).json({
                message: "Product quantity is already 1. Can't decrease further."
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "Server Side Error",
            error: error.message
        });
    }
};

module.exports = { AddToCart  , RemoveToCart,singleUserCart, increaseQuantity , decreaseQuantity}