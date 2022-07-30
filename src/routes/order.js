const express = require('express')
const { requireSignin, userMiddleware } = require(".././common-middleware/index.js")
const { addOrder, getOrders } = require('../controllers/order.js')
const router = express.Router()

router.post('/addOrder', requireSignin, userMiddleware, addOrder)
router.get('/getOrders', requireSignin, userMiddleware, getOrders)

module.exports = router