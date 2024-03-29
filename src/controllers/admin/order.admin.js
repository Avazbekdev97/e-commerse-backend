const Order = require('../../models/order.js')

exports.updateOrder = (req, res) => {
    Order.updateOne(
        { user: req.body.userId, "orderStatus.type": req.body.type },
        {
            $set: {
                "orderStatus.$": [{ date: new Date(), isCompleted: true }]
            },
        }
    ).exec((error, order) => {
        if(error) {
            return res.status(400).json({ error })
        }
        if(order) {
            return res.status(201).json({ order })
        }
    })
}

exports.getCustomerOrders = async (req, res) => {
    const orders = await Order.find({})
        .populate("items.productId", "name")
        .exec()
        res.status(200).json({ orders })
}