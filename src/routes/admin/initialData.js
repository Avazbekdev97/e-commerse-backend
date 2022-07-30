const { initialData } = require('../../controllers/admin/initialData.js')
const express = require('express')
const { requireSignin, adminMiddleware } = require('../../common-middleware/index.js')
const router = express.Router()


router.post('/initialdata', requireSignin, adminMiddleware, initialData)

module.exports = router