const { requireSignin, userMiddleware } = require('../common-middleware/index.js')
const { addItemToCart, getCartItems, removeCartItems } = require('../controllers/cart.js')
const express = require('express')
const router = express.Router()


router.post('/user/cart/removeItem', requireSignin, userMiddleware, removeCartItems)
router.post('/user/cart/addtocart', requireSignin, userMiddleware, addItemToCart)
router.get('/user/getCartItems', requireSignin, userMiddleware, getCartItems)


module.exports = router 