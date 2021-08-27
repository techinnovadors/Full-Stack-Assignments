const mongoose = require("mongoose");

var bookSchema = mongoose.Schema({
    id: Number,
    ratings: Number,
    price: Number,
    pages: Number,
    name: String,
    language: String,
    category: Array,
    author: Array,
    publication: Array
});

const book = mongoose.model("Book", bookSchema);

module.exports = book;