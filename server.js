// server.js
var history = require('connect-history-api-fallback');
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var port = process.env.PORT || 5000;
app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use(history({
	verbose: true
}));
app.use(serveStatic(__dirname + "/dist"));
app.listen(port);
console.log('server started '+ port);

