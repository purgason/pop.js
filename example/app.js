var settings = require('./settings.json');
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
app.listen(settings.port || 3000);