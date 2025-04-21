const { default: mongoose, mongo } = require('mongoose');
const productModel = require('../../model/ProductModel/product.model')
const cloudinary = require('../../config/clodinary')
const fs = require('fs')

const createProduct = async (req, res) => { 
    try {
        const { p_name, p_description, p_price, P_categories, p_stock } = req.body;
        
        const existedProduct = await productModel.findOne({ p_name, p_description, p_price, P_categories })
        if (existedProduct) {
            return res.status(400).json({
                message : "Already Has This Product With Same Details"
            })
        }

        let uploadedImages = [];

        for (let file of req.files) {
            const uploadResult = await cloudinary.uploader.upload(file.path, {
                folder: "eComProducts"
            });

            uploadedImages.push(uploadResult.secure_url);
            fs.unlinkSync(file.path);
        }


        const createProduct = await productModel.create({ 
            p_name,
            p_description,
            p_price,
            P_categories,
            p_stock,
            p_image : uploadedImages
        })

        return res.status(201).json({
            message: "Product Created Successfully",
            product : createProduct
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Side Error",
            error : error.message
        })
    }
}
const DeleteProduct = async (req, res) => { 
    try {
        const { id } = req.params;
        const deleteProduct = await productModel.findByIdAndDelete(id)
        if (!deleteProduct) {
            return res.status(404).json({
                message : "Product Does Not Existed"
            })
        }
        res.status(200).json({
            message: "Product Deleted Successfully",
            product : deleteProduct
        })
    } catch (error) {
        return res.status(500).json({
            message : "Server Side Error"
        })
    }
}
const updateProduct = async (req, res) => { 
    try {

    } catch (error) {
        return res.status(500).json({
            message : "Server Side Error"
        })
    }
}
const getAllProduct = async (req, res) => { 
    try {
        const products = await productModel.find()
        if (products.length <= 0) {
            return res.status(200).json({
                message : "Ther Is No One Product"
            })
        }
        res.status(200).json({
            message: "All Product Fetched Sucessfully",
            products
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Side Error",
            error : error.message
        })
    }
}
const fetchSingleProductDetails = async (req, res) => { 
    try {
        const { id } = req.params; 
        const product = await productModel.findById(id)
        if (!product) {
            return res.status(404).json({
                message: "Product Does Not Found"
            })
        }
        res.status(200).json({
            message: "Product Details Fetched successfully",
            product
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Side Error",
            error:error.message
        })
    }
}
const getProductByCategory = async (req, res) => { 
    try {
        const { categoryId } = req.params;

        const product = await productModel.find({ P_categories : categoryId })
        
        if (!product || product.length === 0) {
            return res.status(200).json({
                message : "There is no one product exist of this category"
            })
        }

        res.status(200).json({
            message: "Product fetched successfully",
            product 
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Side Error",
            error:error.message
        })
    }
}

//GET MULTIPLE CATEGORIES : TASK AFTER E-COM COMPLETED



module.exports = {createProduct, DeleteProduct , updateProduct , getAllProduct , fetchSingleProductDetails ,getProductByCategory  }