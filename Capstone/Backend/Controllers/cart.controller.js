const cartModel = require('../models/cart.model')
const {
    getErrorResponse,
    getResponseV1,
    getResponseV2
} = require('../helpers/helper')

const validateCart = (cartData) => {
    /**
     * 
     * Validate the array of objects
     * check for the correct keys, null values.
     * return boolean
     * 
     * */

    return true
}


const addToCart = (req, res) => {
    const customer = req.user;
    cartModel.findOne({
        customer: customer._id
    }).exec((error, cart) => {
        if (error) return getErrorResponse(res, 500, error)
        isRequestCorrect = validateCart(req.body.cartItems);
        if (isRequestCorrect) {
            if (cart) {
                //Cart is already created.  To Update the existing cartItems               
            } else {

                const _cart = new cartModel({
                    customer: customer.id,
                    cartItems: req.body.cartItems
                })

                _cart.save((error, cartData) => {

                    if (error) return getErrorResponse(res, 500, error)

                    if (cartData) {
                        return getResponseV1(res, 200, cartData)
                    }
                })
            }
        } else
            return getErrorResponse(res, 400);

    })


}

const getCart = async (req, res) => {


    try {
        const cart = await cartModel.findOne({
            customer: req.user.id
        }, '_id cartItems').populate({
            path: "cartItems.product",
            select: "_id name slug price description productPicture"
        });

        return res.json({
            "data": cart
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `DB Error occurred. 
            Contact your administrator`,
            error: error
        });
    }

}


module.exports = {
    addToCart,
    getCart
}