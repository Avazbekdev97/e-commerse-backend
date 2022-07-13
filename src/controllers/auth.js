const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {    
    User.findOne({ email: req.body.email })
    .exec((user) => {
        if(user) return res.status(400).json({
            message: "User already registered"
        })
        
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        
        const _user = new User({ 
            firstName, 
            lastName, 
            email, 
            password,
            userName: Math.random().toString()
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

            if(user.authenticate(req.body.password, user.hashed_password)) {
               const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' })
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

exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
    
    //jwt.decode()
}