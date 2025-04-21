const express = require("express");
const router = express.Router();
const  {adminMiddleware , authMiddleware} = require('../../middleware/authMiddleware')

const {
  createProduct,
  DeleteProduct,
  updateProduct,
  fetchSingleProductDetails,
  getAllProduct,
    getProductByCategory,
    getProductsByMultipleCategories
} = require("../../controllers/ProductController/product.controller");
const upload = require('../../middleware/multerMiddleware')


router.post('/create', upload.array('p_image', 5),adminMiddleware , createProduct)
router.delete('/delete/:id', adminMiddleware , DeleteProduct)
router.get('/products' , getAllProduct)
router.get('/detail/:id' , fetchSingleProductDetails)
router.get('/category/:categoryId' , getProductByCategory)
module.exports = router