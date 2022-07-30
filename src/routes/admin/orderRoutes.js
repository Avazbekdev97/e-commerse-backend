const { requireSignin, adminMiddleware } = require('../../common-middleware/index.js')
const { updateOrder, getCustomerOrders } = require("../../controllers/admin/order.admin.js")
const express = require('express')
const router = express.Router()

router.post('/order/update', requireSignin, adminMiddleware, updateOrder)
router.post('/order/getCustomerOrders', requireSignin, adminMiddleware, getCustomerOrders)

module.exports = router