const { addCategory, getCategory } = require('../controllers/category.js')
const { requireSignin, adminMiddleware } = require('../common-middleware/index.js')
const express = require('express')
const router = express.Router()


router.post('/category/create', requireSignin, adminMiddleware, addCategory)
router.get('/category/getCategory', getCategory)


module.exports = router