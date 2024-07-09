let express = require('express')
let router = express.Router()
let adminController = require('../controller/adminController.js')

router.post('/adminSave', adminController.adminSave)
router.post('/adminlogin', adminController.adminLogin)

module.exports = router