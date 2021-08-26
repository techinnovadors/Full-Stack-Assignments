const mongoose = require('mongoose');

const url = 'mongodb+srv://vjtron:pass_123@cluster0.syhxj.mongodb.net/sample_airbnb?retryWrites=true&w=majority';

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