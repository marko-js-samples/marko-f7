// Compiled using marko@4.2.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/html").t(__filename);

function render(input, out) {
  var data = input;

  out.w("<div data-page=\"index\" class=\"page\"><div class=\"page-content\"><p>Page content goes here</p><a href=\"#about\">About app</a></div></div>");
}

marko_template._ = render;

marko_template.meta = {};
