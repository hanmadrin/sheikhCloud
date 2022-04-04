const express = require('express');
const http = require('http');
const cookieParser = require("cookie-parser");
const app = express();

const path = require('path');
const server = http.createServer(app);
const bodyParser = require('body-parser');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use('/public',express.static('./public'));
app.use('/api', require('./routes/api'));
app.use('/', function(req, res) {
    res.sendFile('public/index.html', {root: __dirname});
});

server.listen(5050);