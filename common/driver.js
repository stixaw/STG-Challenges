require('chromedriver');
var webDriver = require('../node_modules/selenium-webdriver');
//const {Builder, By, Key, until} = require('selenium-webdriver');

module.exports = {
    getDriver: getDriver
}

function getDriver (browser, rm, mobileType){
    var builder = new webDriver.Builder();
    builder.forBrowser('chrome');
    builder.build();

    if(rm != null){
        builder.usingServer(rm);
    }

    if(browser == null){
        browser = 'chrome';
    }
    builder.forBrowser(browser.toLowerCase());

    if(browser.toLowerCase() == 'vhtomr' && mobileType != null ){
        var caps = {
            browserName = 'chrome',
            chromeOptions:{
                mobileEmulation: {
                    deviceName: mobileType
                    //deviceName: 'iPhone X'
                }
            }
        };
        builder.withCapabilities(caps);
    }
    driver = builder.build();

    if(mobileType == null){
        deriver.manage().window().maximize();
    }
    return driver;
};