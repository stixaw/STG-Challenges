require('chromedriver');
var webDriver = require('selenium-webdriver');

module.exports = {
    getDriver: getDriver
}

function getDriver(browser){
    var driver = new webdriver.Builder()
    .forBrowser(browser.toLowerCase())
    //.withCapabilities(webdriver.Capabilities.chrome())
    .build();
    driver.manage().window().maximize();
    return driver;
}