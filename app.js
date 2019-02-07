/**
 * Noor app.js
 * This is where express lives.
 * This is where I put all my live.
 */

 /* Required Web Packages */
 var express = require('express');
 var app = express();
 var session = require('express-session');
 var helmet = require('helmet');
 var url = require('url');
 var router = express.Router();
 var bodyParser = require('body-parser');

 /* Security Hardening settings */
 app.use(helmet());

 /* OS Packages */
 var path = require('path');
 var http = require('http');
 

/* Launch the server */
app.use(express.static(__dirname+'/public',{maxAge: 3456700000}));
require('./router/main')(app);
/* Lets use EJS as an HTML Engine */
app.engine('html',require('ejs').renderFile);
app.set('views',__dirname+'/views');
app.set('view engine','ejs');

var server = app.listen(3000,function(){
    var host = server.address().address
    var port = server.address().port
    console.log('Noor is running at http://%s:%s',host,port);
})