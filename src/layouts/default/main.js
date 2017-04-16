require('framework7');
var isAndroid = Framework7.prototype.device.android === true;
var isIos = Framework7.prototype.device.ios === true;
var $$ = Dom7;
appProps = {
    template7Pages: true,
    debug: true,
    modalTitle: "Marko F7"
};
mainViewProps = { domCache: true, dynamicNavbar: true };
$$('body').addClass('ios');
var myApp = new Framework7(appProps);
window.myApp = myApp;
