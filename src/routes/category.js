const { addCategory, getCategory, updateCategories, deleteCategories } = require('../controllers/category.js')
const { requireSignin, adminMiddleware } = require('../common-middleware/index.js')
const express = require('express')
const router = express.Router()
const path = require('path')
const shortid = require('shortid')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    }, 
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage })

router.post('/category/create', requireSignin, adminMiddleware, upload.single('categoryImage'),addCategory)
router.post('/category/update', upload.array('categoryImage'), updateCategories )
router.post('/category/delete', deleteCategories)
router.get('/category/getCategory', getCategory) 


module.exports = router