const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination:'./uploads',
    filename:function (req, file, callback){
        callback(null,file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

module.exports = multer({storage:storage})