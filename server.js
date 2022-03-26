const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const server = http.createServer(app);


app.use('/public',express.static('./public'));


app.get('/',(req,res)=> res.sendStatus(200));


server.listen(5000);