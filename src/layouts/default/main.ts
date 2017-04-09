import NotificationCenter from "../../client/NotificationCenter";
import BrowserConfig from "../../client/config/BrowserConfig";
import PushReceiver from "../../client/PushReceiver";
import {CommandProtocol} from "../../client/Protocols";
import NativeBridge from "../../client/NativeBridge";
import LoginEventHandler from "../../client/LoginEventHandler";
import ModelFactory from "../../client/ModelFactory";
import UpdateLoginDataEventHandler from "../../client/UpdateLoginDataEventHandler";
import LocalPushReceiver from "../../client/LocalPushReceiver";
import BackPressHandler from "../../client/android/BackPressHandler";
import Analytics from "../../client/Analytics";
import AuthHandler from "../../client/AuthHandler";
import {FayeConnectionManager} from "../../client/faye/FayeConnectionManager";
import MyDevice from "../../client/MyDevice";
require('framework7')
declare var Dom7:any
declare var Framework7:any
declare var Template7:any
declare var myApp:any
declare var mainViewProps:any
declare var appProps:any
declare var fireEvent:any
declare var window:any
declare var ga:Function

BrowserConfig.initialize()

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

mainViewProps = {domCache: true}

if (isAndroid) {
    var elements = Dom7('head').children("link[device-type='ios']")
    for (var i = 0; i < elements.length; i++) {
       elements[i].parentNode.removeChild(elements[i])
    }
    appProps["material"] = true;
    mainViewProps["dynamicNavbar"] = false;
    $$('body').addClass('android')
    BackPressHandler.listen()
} else {
    var elements = Dom7('head').children("link[device-type='material']")
    for (var i = 0; i < elements.length; i++) {
        elements[i].parentNode.removeChild(elements[i])
    }
    mainViewProps["dynamicNavbar"] = true;
    $$('body').addClass('ios')
}


Framework7.prototype.plugins.debug = function (app, params) {
    // exit if not enabled
    if (!params) return;

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
                NotificationCenter.sharedInstance.emit('pageAfterAnimation', pageData)
                console.log('pageData.name',pageData.name);
                Analytics.trackScreenView(pageData.name);
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

let eventHandler:{[key:string]:CommandProtocol} = {
    "push": new PushReceiver(),
    "local_push": new LocalPushReceiver(),
    "setLoginData": new LoginEventHandler(),
    "updateLoginData": new UpdateLoginDataEventHandler()
}

function urldecode(str) {
    return decodeURIComponent((str + '').replace(/\+/g, '%20'));
}
function urldecodeAndroidArgs(args:any) {
    for (var key in args) {
        var value = args[key];
        args[key] = typeof value == 'string' ? urldecode(value) : urldecodeAndroidArgs(value)
    }
    return args;
}
fireEvent = function (event:string, args:any) {
    args = isAndroid ? urldecodeAndroidArgs(args) : args;
    eventHandler[event] ? eventHandler[event].execute(args) : null
    NotificationCenter.sharedInstance.emit(event, args)
    return {ok: "true"}
}

myApp = new Framework7(appProps);
window.myApp = myApp;

ModelFactory.version().get().then((result)=> {
        BrowserConfig.set("bundle_version", result.version);
        let versionContainer:any = document.getElementById("version-container") || {}
        versionContainer.innerHTML = result.version ? `Version - ${result.version}` : ""
    }, (err)=> {
    }
);

window.onerror = function(errorMsg, url, lineNumber) {
    console.log("Error occured: " + errorMsg);
    ga('send', 'exception', {exDescription: errorMsg + ":" + url + ":" + lineNumber});
    return false;
};

var oldWarn = console.warn;
console.warn = function (message, url, lineNumber) {
    ga('send', 'exception', {exDescription: message + ":" + url + ":" + lineNumber});
    oldWarn.apply(console, arguments);
};
var oldError = console.error;
console.error = function (message, url, lineNumber) {
    ga('send', 'exception', {exDescription: message + ":" + url + ":" + lineNumber, exFatal: true});
    oldError.apply(console, arguments);
};
Dom7(document).on('DOMContentLoaded', function(){
    NativeBridge.sendMessage("loaded", {})
    NativeBridge.setupNativeBridge()
    if (MyDevice.isLoggedIn()) {
        AuthHandler.sendDeviceTokenToServerIfPending()
        AuthHandler.refreshAuthToken()
    }
    FayeConnectionManager.subscribeForNotifications()
});

