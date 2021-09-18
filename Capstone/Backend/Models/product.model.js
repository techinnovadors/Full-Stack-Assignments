const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please provide your product Name"],
        trim: true
    },
    slug: {
        type: String,
        required: [true, "Please provide your product Slug"],
        trim: true,
        unique: true,
    },
    price: {
        type: Number,
        required: [true, "Please provide the product price"],
    },
    quantity: {
        type: Number,
        required: [true, "Please provide the product quantity"],
    },
    productPicture: [{
        img: {
            type: String,
        }
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        review: {
            type: String
        }
    }],
    updatedAt: Date

}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);