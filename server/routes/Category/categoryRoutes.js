const express = require("express");
const router = express.Router();
const  upload = require('../../middleware/multerMiddleware')
const {
  createCategory,
    deleteCategory,
    getAllCategories,
  updateCategories
} = require("../../controllers/CategoryController/category.controller");
const { adminMiddleware } = require('../../middleware/authMiddleware')


router.post('/create' ,adminMiddleware, upload.single('categoryImage') , createCategory)
router.post('/delete/:id', adminMiddleware,deleteCategory)
router.put('/update/:id', updateCategories,updateCategories)
router.get('/categories',getAllCategories)

module.exports = router 

