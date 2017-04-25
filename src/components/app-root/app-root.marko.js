// Compiled using marko@4.2.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/html").t(__filename),
    __browser_json = require.resolve("./browser.json"),
    marko_helpers = require("marko/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    lasso_page_tag = marko_loadTag(require("lasso/taglib/config-tag")),
    lasso_head_tag = marko_loadTag(require("lasso/taglib/head-tag")),
    marko_loadTemplate = require("marko/runtime/helper-loadTemplate"),
    app_home_template = marko_loadTemplate(require.resolve("../components/app-home.marko")),
    app_home_tag = marko_loadTag(app_home_template),
    app_about_template = marko_loadTemplate(require.resolve("../components/app-about.marko")),
    app_about_tag = marko_loadTag(app_about_template),
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

  out.w("</head><body><div class=\"views\"><div class=\"view view-main\"><div class=\"pages\">");

  app_home_tag({}, out);

  app_about_tag({}, out);

  out.w("</div></div></div>");

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
      "../components/app-home.marko",
      "../components/app-about.marko",
      "lasso/taglib/body-tag",
      "marko/components/taglib/init-components-tag",
      "marko/taglibs/async/await-reorderer-tag"
    ]
  };
