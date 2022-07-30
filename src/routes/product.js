//const { addCategory, getCategory } = require('../controllers/category.js')
const { requireSignin, adminMiddleware } = require('../common-middleware/index.js')
const { createProduct, getProductsBySlug, getProductDetailsById, getProducts } = require('../controllers/product.js')
const express = require('express')
const multer = require('multer')
const router = express.Router()
const path = require('path')
const shortid = require('shortid')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    }, 
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage })

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct)
router.post('/product/getProducts', requireSignin, adminMiddleware, getProducts)
router.get('/product/:productId', getProductDetailsById)
router.get('/products/:slug', getProductsBySlug)

//router.get('/category/getCategory', getCategory)


module.exports = router