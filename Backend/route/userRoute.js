let userController = require('../controller/userController.js')
let express = require('express')
let router = express.Router()
let multer = require('../multerConfig.js')

router.post('/userSignup',multer.single('image'), userController.signUp)
router.post('/userLogin', userController.userLogin)
router.post('/createUser/:unique',userController.clientTable)
router.get('/getUser/:unique', userController.getClient)
router.get('/verify', userController.verify)

module.exports = router