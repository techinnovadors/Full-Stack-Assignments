const slugify = require('slugify')

const productModel = require('../models/product.model');


const addNewProduct = (req, res) => {

    const {
        name,
        price,
        description,
        quantity,
        category,
    } = req.body

    const _product = new productModel({
        name,
        slug: slugify(name),
        price,
        description,
        quantity,
        category,
        createdBy: req.user.id
    })

    _product.save((error, product) => {
        if (error) {
            return res.status(500).json({
                error: error,
                success: false,
                message: "DB Error occurred. Contact your administrator"
            })
        }

        if (product) {
            res.status(201).json({
                success: true,
                data: product,
                message: "Product successfully Saved."
            })
        }
    })

}

module.exports = {
    addNewProduct
}