/**
 * HTTP is a built-in module. It allows node to transfer data using Hyper Text Trasfer Protocol (HTTP)
 * 
 * 
 */


var http = require('http');


http.createServer(function (req, res) {

    console.log(req);
    console.log("Listening to 8080") 
    res.write("Hello World");
    res.end();

}).listen('8080');