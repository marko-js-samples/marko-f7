
require('framework7')
declare var Framework7:any
declare var Dom7:any
declare var appProps:any
declare var mainViewProps:any
declare var myApp:any
var isAndroid = Framework7.prototype.device.android === true;
var isIos = Framework7.prototype.device.ios === true;

var $$ = Dom7;

appProps = {
    template7Pages: true,
    debug: true,
    modalTitle: "Marko F7"
};

mainViewProps = {domCache: true,dynamicNavbar:true}
    $$('body').addClass('ios')

var myApp = new Framework7(appProps);
(window as any).myApp = myApp;




