// Compiled using marko@4.2.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/html").t(__filename),
    __browser_json = require.resolve("./browser.json"),
    marko_helpers = require("marko/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    lasso_page_tag = marko_loadTag(require("lasso/taglib/config-tag")),
    lasso_head_tag = marko_loadTag(require("lasso/taglib/head-tag")),
    lasso_body_tag = marko_loadTag(require("lasso/taglib/body-tag")),
    init_components_tag = marko_loadTag(require("marko/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/taglibs/async/await-reorderer-tag"));

function render(input, out) {
  var data = input;

  lasso_page_tag({
      packagePath: __browser_json,
      dirname: __dirname,
      filename: __filename
    }, out);

  out.w("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>Marko + Lasso</title>");

  lasso_head_tag({}, out);

  out.w("</head><body><div class=\"statusbar-overlay\"></div><div class=\"panel-overlay\"></div><div class=\"panel panel-left panel-reveal\"><div class=\"content-block\"><p>Left panel content goes here</p></div></div><div class=\"views\"><div class=\"view view-main\"><div class=\"navbar\"><div class=\"navbar-inner\"><div class=\"center sliding\">Awesome App</div><div class=\"right\"><a href=\"#\" class=\"link icon-only open-panel\"><i class=\"icon icon-bars\"></i></a></div></div></div><div class=\"pages navbar-through toolbar-through\"><div data-page=\"index\" class=\"page\"><div class=\"page-content\"><p>Page content goes here</p><a href=\"about.html\">About app</a></div></div></div><div class=\"toolbar\"><div class=\"toolbar-inner\"><a href=\"#\" class=\"link\">Link 1</a><a href=\"#\" class=\"link\">Link 2</a></div></div></div></div>");

  lasso_body_tag({}, out);

  init_components_tag({}, out);

  await_reorderer_tag({}, out);

  out.w("</body></html>");
}

marko_template._ = render;

marko_template.meta = {
    tags: [
      "lasso/taglib/config-tag",
      "lasso/taglib/head-tag",
      "lasso/taglib/body-tag",
      "marko/components/taglib/init-components-tag",
      "marko/taglibs/async/await-reorderer-tag"
    ]
  };
