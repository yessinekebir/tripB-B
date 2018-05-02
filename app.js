var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fake-AirB&B');
var index = require('./routes/index');
var houses = require('./routes/houses');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/houses', houses);
app.use('/', index);


var port = 3001;
app.listen(port, ()=>
{console.log("server start at port:", port)})
module.exports = app;
