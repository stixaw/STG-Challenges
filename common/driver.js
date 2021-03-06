require('chromedriver')
fs = require('fs')
webDriver = require('../node_modules/selenium-webdriver')

module.exports = {
    getDriver: getDriver,
    getDriver1: getDriver1,
    takeScreenshot: takeScreenshot
}

function getDriver1(browserType){
    driver = new webDriver.Builder().forBrowser(browserType.toLowerCase()).build()
    driver.manage().window().maximize()

    return driver
}

function takeScreenshot(driver, name){
    driver.takeScreenshot()
    .then(function(base64Image){
        var decodedImage = new Buffer.from(base64Image,'base64');
        fs.writeFile("filename.jpg", decodedImage, function(err){console.log(err)});
        var d = new Date();
        var fn = name + d.getTime() + '.jpg';
        fs.writeFile('../screenshots/' + fn, decodedImage, function(err){});
        
    })
}

function getDriver(browser, rm, mobileType){  
    var builder = new webDriver.Builder()

    //remote server
    if(rm != null){
        builder.usingServer(rm)
    }

    if(browser == null){
        browser = 'chrome'
    }
    builder.forBrowser(browser.toLowerCase())

    if(mobileType != null ){
        var caps = {
            browserName: browser,
            chromeOptions:{
                mobileEmulation: {
                    deviceName: mobileType
                    //deviceName: 'iPhone X'
                }
            }
        }
        builder.withCapabilities(caps)
    }
    driver = builder.build()

    if(mobileType == null){
        driver.manage().window().maximize()
    }
    return driver
}