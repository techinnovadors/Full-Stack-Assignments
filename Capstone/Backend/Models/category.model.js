const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please provide your Category Name"],
        trim: true
    }, 
    slug: {
        type: String,
        required: [true, "Please provide your Category Slug"],
        trim: true,
        unique: true,
    },
    type : {
        type: String,
    },
    parentId : {
        type: String,
    },
    // createdBy : {
    //     type 
    // }

}, {
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);