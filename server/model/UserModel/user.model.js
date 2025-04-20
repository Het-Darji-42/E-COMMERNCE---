const mongoose = require('mongoose')
const userSchma = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: true, 
            index: true, 
            lowercase : true
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
        // userImage: { 
        //     type: String,  //clodinary
        //     required: false
        // }
    },{timestamps : true}
)

const userModel = mongoose.model('User', userSchma)
module.exports = userModel