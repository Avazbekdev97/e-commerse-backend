const Order = require('../models/order.js')
const Cart = require('../models/cart.js')
const Address = require('../models/address.js')

exports.addOrder = (req, res) => {
    Cart.deleteOne({ user: req.user._id }).exec((error, result) => {
        if(error) return res.status(400).json({ error })
        if(result) {
            req.body.user = req.user._id
            const order = new Order(req.body)
            order.save((error, order) => {
                if(error) return res.status(400).json({ error })
                if(order) {
                    return res.status(201).json({ order })
                }
            })
        }
    })
}

exports.getOrders = (req, res) => {
    Order.find({ user: req.user._id })
    .select("_id paymentStatus items")
    .populate("items.productId", "_id name productPictures")
    .lean()
    .exec((error, order) => {
        if(error) {
            return res.status(400).json({ error })
        }
        if(order) {
            Address.findOne({
                user: req.user._id
            }).exec((error, address) => {
                if(error) return res.status(4000).json({ error })
                order.address = address.address.find(
                    (adr) => adr._id.toString() == order.addressId.toString()
                )
                res.status(200).json({
                    order,
                });
            });
        }
    });
}