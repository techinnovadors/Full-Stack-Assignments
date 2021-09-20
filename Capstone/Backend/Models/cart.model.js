const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cartItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);



/***
 * Amazon  -- 
 *      Mobile  -- Cart  Mac, Screenguard and airpods 
 *      Desktop -- Empty / Mac, Screenguard and airpods
 * 
 * 
 */