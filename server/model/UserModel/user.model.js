const mongoose = require('mongoose')
const userSchma = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: true, 
            index: true, 
        },
        email: { 
            type: String, 
            required: true, 
            lowercase : true
        },
        password: { 
            type: String, 
            required: true, 
        },
        role : { 
            type: String, 
            enum: ['user', 'admin'],
            default : "user"
        },
        profileImage: { 
            type: String,  //clodinary
            required: false
        }
    },{timestamps : true}
)

const userModel = mongoose.model('User', userSchma)
module.exports = userModel