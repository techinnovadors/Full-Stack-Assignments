const mongoose = require("mongoose");

var authorSchema = mongoose.Schema({
    id: Number,
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: String,
    contact_numebr: String,
    country: String,
    gender: String,
    books_published: Array,
    publications_associated: Array
});

const author = mongoose.model("Author", authorSchema);

module.exports = author;