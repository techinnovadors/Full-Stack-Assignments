const mongoose = require("mongoose");

var authorSchema = mongoose.Schema({
    id: Number,
    age: Number,
    email: String,
    name: String,
    contact_numebr: String,
    country: String,
    gender: String,
    books_published: Array,
    publications_associated: Array
});

const author = mongoose.model("Author", authorSchema);

module.exports = author;