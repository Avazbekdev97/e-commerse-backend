const express = require('express')
const { requireSignin } = require('../../common-middleware/index.js')
const router = express.Router()
const { signup, signin, signout } = require('../../controllers/admin/auth.js')
const { validateSignUpRequest, validateSigninRequest, isRequestValidate } = require('../../validators/auth.js')


router.post('/admin/signup', validateSignUpRequest, isRequestValidate, signup)

router.post('/admin/signin', validateSigninRequest, isRequestValidate, signin)

router.post('/admin/signout', requireSignin, signout)

/* router.post('/profile', requireSignin, (req, res) => {
    res.status(200).json({ user: 'profile' })
}) */

module.exports = router