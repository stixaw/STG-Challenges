require('chromedriver');
var webDriver = require('../node_modules/selenium-webdriver');
//const {Builder, By, until, Key} = require('../node_modules/selenium-webdriver');

module.exports = {
    getDriver: getDriver,
    getDriver1: getDriver1
}

function getDriver1(browserType){
    driver = new webDriver.Builder().forBrowser(browserType.toLowerCase()).build();
    driver.manage().window().maximize();

    return driver;

}


function getDriver(browser, rm, mobileType){  
    var builder = new webDriver.Builder();

    //remote server
    if(rm != null){
        builder.usingServer(rm);
    }

    if(browser == null){
        browser = 'chrome';
    }
    builder.forBrowser(browser.toLowerCase());

    if(mobileType != null ){
        var caps = {
            browserName: browser,
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
        driver.manage().window().maximize();
    }
    return driver;

};