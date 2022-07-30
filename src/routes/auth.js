const { signup, signin } = require('../controllers/auth.js')
const { validateSignUpRequest, validateSigninRequest, isRequestValidate } = require('../validators/auth.js')
const { check } = require('express-validator')
const express = require('express')
const router = express.Router()

router.post('/signup', validateSignUpRequest, isRequestValidate, signup)

router.post('/signin', validateSigninRequest, isRequestValidate, signin)

/* router.post('/profile', requireSignin, (req, res) => {
    res.status(200).json({ user: 'profile' })
}) */

module.exports = router