const express = require('express')
const router = express.Router()
const multer = require('../multerConfig.js')
const cartController = require('../controller/cartController.js')

router.post('/saveCart/:unique', multer.single('image'),cartController.cartSave)
router.get('/getCart/:unique',cartController.getCart)
router.delete('/deleteCart/:id/:unique',cartController.delete)

module.exports = router
