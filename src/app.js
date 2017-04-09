var main = require("./backend/pages/main/index");
var express = require("express");
var app = express();
app.get('/', main.get);
