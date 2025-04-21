const express = require('express')
const router = express.Router()
const {Register, Login} = require('../../controllers/AuthControllers/user.controller')
const upload = require('../../middleware/multerMiddleware')


router.post('/register',upload.single('profileImage'), Register)
router.post('/login', Login)

module.exports = router