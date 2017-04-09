var NotificationCenter_1 = require("../../client/NotificationCenter");
var BrowserConfig_1 = require("../../client/config/BrowserConfig");
var PushReceiver_1 = require("../../client/PushReceiver");
var NativeBridge_1 = require("../../client/NativeBridge");
var LoginEventHandler_1 = require("../../client/LoginEventHandler");
var ModelFactory_1 = require("../../client/ModelFactory");
var UpdateLoginDataEventHandler_1 = require("../../client/UpdateLoginDataEventHandler");
var LocalPushReceiver_1 = require("../../client/LocalPushReceiver");
var BackPressHandler_1 = require("../../client/android/BackPressHandler");
var Analytics_1 = require("../../client/Analytics");
var AuthHandler_1 = require("../../client/AuthHandler");
var FayeConnectionManager_1 = require("../../client/faye/FayeConnectionManager");
var MyDevice_1 = require("../../client/MyDevice");
require('framework7');
BrowserConfig_1["default"].initialize();
var isAndroid = Framework7.prototype.device.android === true;
var isIos = Framework7.prototype.device.ios === true;
Template7.global = {
    android: isAndroid,
    ios: isIos
};
var $$ = Dom7;
appProps = {
    template7Pages: true,
    debug: true,
    modalTitle: "ConfEngine"
};
mainViewProps = { domCache: true };
if (isAndroid) {
    var elements = Dom7('head').children("link[device-type='ios']");
    for (var i = 0; i < elements.length; i++) {
        elements[i].parentNode.removeChild(elements[i]);
    }
    appProps["material"] = true;
    mainViewProps["dynamicNavbar"] = false;
    $$('body').addClass('android');
    BackPressHandler_1["default"].listen();
}
else {
    var elements = Dom7('head').children("link[device-type='material']");
    for (var i = 0; i < elements.length; i++) {
        elements[i].parentNode.removeChild(elements[i]);
    }
    mainViewProps["dynamicNavbar"] = true;
    $$('body').addClass('ios');
}
Framework7.prototype.plugins.debug = function (app, params) {
    // exit if not enabled
    if (!params)
        return;
    return {
        hooks: {
            appInit: function () {
                console.log('appInit');
            },
            navbarInit: function (navbar, pageData) {
                // console.log('navbarInit', navbar, pageData);
            },
            pageInit: function (pageData) {
                // console.log('pageInit', pageData);
            },
            pageBeforeInit: function (pageData) {
                // console.log('pageBeforeInit', pageData);
            },
            pageBeforeAnimation: function (pageData) {
                // console.log('pageBeforeAnimation', pageData);
                // NotificationCenter.sharedInstance.emit('pageBeforeAnimation', pageData)
            },
            pageAfterAnimation: function (pageData) {
                // console.log('pageAfterAnimation', pageData);
                NotificationCenter_1["default"].sharedInstance.emit('pageAfterAnimation', pageData);
                console.log('pageData.name', pageData.name);
                Analytics_1["default"].trackScreenView(pageData.name);
            },
            pageBeforeRemove: function (pageData) {
                // console.log('pageBeforeRemove', pageData);
            },
            addView: function (view) {
                console.log('addView', view);
            },
            loadPage: function (view, url, content) {
                console.log('loadPage', view, url, content);
            },
            goBack: function (view, url, preloadOnly) {
                console.log('goBack', view, url, preloadOnly);
            },
            swipePanelSetTransform: function (views, panel, percentage) {
                console.log('swipePanelSetTransform', views, panel, percentage);
            }
        }
    };
};
var eventHandler = {
    "push": new PushReceiver_1["default"](),
    "local_push": new LocalPushReceiver_1["default"](),
    "setLoginData": new LoginEventHandler_1["default"](),
    "updateLoginData": new UpdateLoginDataEventHandler_1["default"]()
};
function urldecode(str) {
    return decodeURIComponent((str + '').replace(/\+/g, '%20'));
}
function urldecodeAndroidArgs(args) {
    for (var key in args) {
        var value = args[key];
        args[key] = typeof value == 'string' ? urldecode(value) : urldecodeAndroidArgs(value);
    }
    return args;
}
fireEvent = function (event, args) {
    args = isAndroid ? urldecodeAndroidArgs(args) : args;
    eventHandler[event] ? eventHandler[event].execute(args) : null;
    NotificationCenter_1["default"].sharedInstance.emit(event, args);
    return { ok: "true" };
};
myApp = new Framework7(appProps);
window.myApp = myApp;
ModelFactory_1["default"].version().get().then(function (result) {
    BrowserConfig_1["default"].set("bundle_version", result.version);
    var versionContainer = document.getElementById("version-container") || {};
    versionContainer.innerHTML = result.version ? "Version - " + result.version : "";
}, function (err) {
});
window.onerror = function (errorMsg, url, lineNumber) {
    console.log("Error occured: " + errorMsg);
    ga('send', 'exception', { exDescription: errorMsg + ":" + url + ":" + lineNumber });
    return false;
};
var oldWarn = console.warn;
console.warn = function (message, url, lineNumber) {
    ga('send', 'exception', { exDescription: message + ":" + url + ":" + lineNumber });
    oldWarn.apply(console, arguments);
};
var oldError = console.error;
console.error = function (message, url, lineNumber) {
    ga('send', 'exception', { exDescription: message + ":" + url + ":" + lineNumber, exFatal: true });
    oldError.apply(console, arguments);
};
Dom7(document).on('DOMContentLoaded', function () {
    NativeBridge_1["default"].sendMessage("loaded", {});
    NativeBridge_1["default"].setupNativeBridge();
    if (MyDevice_1["default"].isLoggedIn()) {
        AuthHandler_1["default"].sendDeviceTokenToServerIfPending();
        AuthHandler_1["default"].refreshAuthToken();
    }
    FayeConnectionManager_1.FayeConnectionManager.subscribeForNotifications();
});
