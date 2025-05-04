const fs = require('fs')
const categoryModel = require('../../model/CategoryModel/category.model')
const cloudinary = require('../../config/clodinary')

const createCategory = async (req, res) => { 
    try {
        
        const { category } = req.body
    
        const isCategory = await categoryModel.findOne({ category })
        if (isCategory) {
            return res.status(400).json({
                message : "Category Already Existed"
            })
        }

        const uploadResult = await cloudinary.uploader
       .upload(
           req.file.path, {
               folder: 'CategoryImages'
           }
        )
       .catch((error) => {
           console.log(error);
       });
       fs.unlinkSync(req.file.path);
        
        
       
    
        const createCategory = await categoryModel.create({
            category: category,
            categoryImage: uploadResult.secure_url,
            imagePublicId : uploadResult.public_id,
            
        })
    
        res.status(201).json({
            message: "Category is created",
            category: createCategory,
        })
    } catch (error) {
        return res.status(500).json({
            message: "server side error",
            error : error.message
        })
    }
}   

const deleteCategory = async (req, res) => { 
    try {
        const { id } = req.params;
        const deleteCategory = await categoryModel.findByIdAndDelete(id)
        if (!deleteCategory) { 
            return res.status(404).json({
                message : "Does not found category"
            })
        }
        const uploadResult = await cloudinary.uploader
        .destroy(
            deleteCategory.imagePublicId
         )
        .catch((error) => {
            console.log(error);
        });

        res.status(200).json({
            message : "Category Deleted Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message : "server side error"
        })
    }
}

const getAllCategories = async (req, res) => { 
    try {
        const getCategories = await categoryModel.find()
        res.status(200).json({
            message: "ALl Categories Founded",
            totalCategories: getCategories.length,
            category : getCategories
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Server Side Error",
            error : error.message 
        })
    }
}

const updateCategories = async (req, res) => {
    try {
        const { id } = req.params; 
        const { category } = req.body;

        const isExisted = await categoryModel.findOne({ category })
        if (isExisted) {
            return res.status(400).json({
                    message : "Same Category Is Already Existed"
                })
            }
        
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, { category } ,  {new : true})
        if (!updatedCategory) {
            return res.status(404).json({
                message : "Category does not found"
            })
        }
        res.status(200).json({
            message: "Category Updated SUcessfully",
            category : updatedCategory
        })

    } catch (error) {
        return res.status(500).json({ 
            message: "server side error",
            error : error.message 
        })
    }
}
module.exports = { createCategory , deleteCategory , getAllCategories ,updateCategories}