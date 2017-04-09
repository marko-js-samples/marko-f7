import * as main from "./backend/pages/main/index";
import * as express from "express";
var app = express();
app.get('/',main.get)
