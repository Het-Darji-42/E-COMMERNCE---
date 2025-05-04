const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
    {
        category: { 
            type: String,
            required: true,
            lowercase: true,
        },
        categoryImage: { 
            type: String, 
            required : false ,
        },
        imagePublicId: {
            type: String,
            required: true,
          },
          

    },{timestamps : true}
)

const categoryModel = mongoose.model('Category' , categorySchema)
module.exports = categoryModel
