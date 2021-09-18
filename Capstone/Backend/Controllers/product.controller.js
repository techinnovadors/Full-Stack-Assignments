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

    let productImageList = []
    if (req.files.length > 0) {
        productImageList = req.files.map((file) => {
            return {
                img: file.path
            }
        })
    }
    console.log(productImageList)


    const _product = new productModel({
        name,
        slug: slugify(name),
        price,
        description,
        quantity,
        category,
        "productPicture": productImageList,
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


const getProduct = async (req, res) => {

    try {
        const product = await productModel.find({});

        return res.json({
            product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "DB Error occurred. Contact your administrator",
            error: error
        });
    }
}

module.exports = {
    addNewProduct,
    getProduct
}