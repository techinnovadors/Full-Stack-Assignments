const mongoose = require('mongoose');

const password = encodeURIComponent('pass_123');

const url = `mongodb+srv://vjtron:${password}@cluster0.syhxj.mongodb.net/sample_airbnb?retryWrites=true&w=majority`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const dbConn = mongoose.connection;

dbConn.on("error", console.error.bind(console, "Connection Error"));
dbConn.on("open", function () {
    console.log("DB Connection Successful");
});

module.exports = dbConn;