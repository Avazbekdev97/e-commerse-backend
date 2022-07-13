const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const { signup, signin, requireSignin } = require('../controllers/auth.js')


router.post('/signup', signup)

router.post('/signin', signin)

/* router.post('/profile', requireSignin, (req, res) => {
    res.status(200).json({ user: 'profile' })
}) */

module.exports = router