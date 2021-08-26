const mongoose = require("mongoose");

var authorSchema = mongoose.Schema({
    id: Number,
    name: {
        type: String,
        require: true
    },
    books: Array
}, {
    strict: false
});

const author = mongoose.model("Author", authorSchema);

module.exports = author;