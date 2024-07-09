const express = require('express')
const router = express.Router()
const controller = require('../controller/productController.js')
const multer = require('../multerConfig.js')

router.post('/send',multer.single('image'),controller.send)
router.get('/get',controller.get)
router.get('/getProduct/:id',controller.getProduct)
router.put('/update/:id',controller.update)
router.delete('/delete/:id', controller.delete)
router.get('/getName/:input', controller.searchData)

module.exports = router