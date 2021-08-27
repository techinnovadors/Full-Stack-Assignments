const mongoose = require("mongoose");

var publicationSchema = mongoose.Schema({
    id: Number,
    revenue: Number,
    year_of_establishment: Number,
    email: String,
    name: String,
    contact_numebr: String,
    address: String,
    books_published: Array,
    authors_associated: Array
});

const publication = mongoose.model("Publication", publicationSchema);

module.exports = publication;