var express = require('express');
var app = express();

app.get('/neuertest/', function (req, res) {
    res.send("test");
});