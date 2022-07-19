const { addItemToCart } = require('../controllers/cart.js')
const { requireSignin, userMiddleware } = require('../common-middleware/index.js')
const express = require('express')
const router = express.Router()


router.post('/user/cart/addtocart', requireSignin, userMiddleware, addItemToCart)


module.exports = router 