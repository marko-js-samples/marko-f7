function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      __loadTag = __helpers.t,
      lasso_slot_tag = __loadTag(require("lasso/taglib/slot-tag")),
      layout_placeholder_tag = __loadTag(require("marko/taglibs/layout/placeholder-tag")),
      lasso_head_tag = __loadTag(require("lasso/taglib/head-tag")),
      confirmation_popup_tag = __loadTag(require("../../components-mingle/confirmation-popup")),
      login_dialog_tag = __loadTag(require("../../components-common/login-dialog")),
      login_email_dialog_tag = __loadTag(require("../../components-common/login-email-dialog")),
      app_notification_tag = __loadTag(require("../../components-common/app-notification")),
      lasso_body_tag = __loadTag(require("lasso/taglib/body-tag")),
      init_widgets_tag = __loadTag(require("marko-widgets/taglib/init-widgets-tag")),
      await_reorderer_tag = __loadTag(require("marko/taglibs/async/await-reorderer-tag"));

  return function render(data, out) {
    out.w("<!doctype html>\n<html lang=\"en\">\n<head>\n\n    <meta charset=\"utf-8\">\n    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n    <meta name=\"mobile-web-app-capable\" content=\"yes\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no\">\n    ");

    lasso_slot_tag({
        name: "ios-slot",
        externalStyleAttrs: {
            "device-type": "ios"
          }
      }, out);

    out.w("\n    ");

    lasso_slot_tag({
        name: "material-slot",
        externalStyleAttrs: {
            "device-type": "material"
          }
      }, out);

    out.w("\n    ");

    lasso_slot_tag({
        name: "common-slot"
      }, out);

    out.w("\n    <title>\n        ");

    layout_placeholder_tag({
        name: "title",
        content: data.layoutContent
      }, out);

    out.w("\n    </title>\n\n    \n    \n    <script>\n        window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;\n        ga('create', 'UA-52370860-4', 'auto');\n        ga('set', 'checkProtocolTask', null)\n        ga('set', 'appName', 'Confengine Mobile Hybrid');\n    </script>\n    <script async src=\"https://www.google-analytics.com/analytics.js\"></script>\n    ");

    lasso_head_tag({}, out);

    out.w("\n</head>\n<body>\n");

    layout_placeholder_tag({
        name: "yield",
        content: data.layoutContent
      }, out);

    out.w("\n\n");

    confirmation_popup_tag({}, out);

    out.w("\n");

    login_dialog_tag({}, out);

    out.w("\n");

    login_email_dialog_tag({}, out);

    out.w("\n");

    app_notification_tag({}, out);

    out.w("\n\n\n");

    lasso_body_tag({}, out);

    out.w("\n\n\n\n");

    init_widgets_tag({
        immediate: true
      }, out);

    out.w("\n\n\n");

    await_reorderer_tag({}, out);

    out.w("\n\n\n\n</body>\n</html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
