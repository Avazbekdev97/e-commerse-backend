const express = require('express')
const router = express.Router()
const { signup, signin } = require('../../controllers/admin/auth.js')
const { validateSignUpRequest, validateSigninRequest, isRequestValidate } = require('../../validators/auth.js')


router.post('/admin/signup', validateSignUpRequest, isRequestValidate, signup)

router.post('/admin/signin', validateSigninRequest, isRequestValidate, signin)

/* router.post('/profile', requireSignin, (req, res) => {
    res.status(200).json({ user: 'profile' })
}) */

module.exports = router