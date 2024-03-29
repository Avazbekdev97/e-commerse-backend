const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const shortid = require('shortid')

const generateJwtToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}

exports.signup = (req, res, next) => {    
    
    User.findOne({ email: req.body.email })
    .exec(async (user) => {
        if(user) return res.status(400).json({
            message: "User already registered"
        })
        
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        
        const hashed_password = await bcrypt.hash(password, 10)

        const _user = new User({ 
            firstName, 
            lastName, 
            email, 
            hashed_password,
            userName: shortid.generate()
         });
         
         _user.save((error, data) => {
            if(error) {
                console.log(error.message);
                return res.status(400).json({
                    message: error.message
                })
            }

            if(data) {
                return res.status(201).json({
                    user: 'User created successfully...!'
                })
            }

         })

    })

}

exports.signin = (req, res) => {
   
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(error) return res.status(400).json({ error })
        if(user) {
            if(user.authenticate(req.body.password, user.hashed_password) && user.role === 'user') {
               const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1d' })
               const { _id, firstName, lastName, email, role, fullName } = user
               res.status(200).json({
                token,
                user: {
                    _id, firstName, lastName, email, role, fullName
                }
               }) 
               
            }else {
                res.status(400).json({
                    message: 'Invalid Password'
                })
            }   

        } else {
            return res.status(400).json({ message: 'Something went wrong' })
        }
    })
}

