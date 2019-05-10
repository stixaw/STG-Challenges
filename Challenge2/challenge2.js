require('chromedriver');
const {Builder, By, until, Key} = require('../node_modules/selenium-webdriver');
var assert = require('../node_modules/chai').assert;
// var By = webdriver.By;
// var until = webdriver.until;
// var Key = webdriver.Key;

describe("challenge1 suite", function(){
    this.timeout(20000);
    var driver;

    before(function () {
    // initializing chrome driver
    //    driver = new webdriver.Builder()
    //    .withCapabilities(webdriver.Capabilities.chrome())
    //    .build();
        driver = new Builder().forBrowser('chrome').build();
    });

    after(function () {
        return driver.quit();
    });

    it("It should open the copart website", async function() {
        return await driver.get("http://www.copart.com");
    });
    
    // it("The title is 'Auto Auction - Copart USA - Salvage Cars For Sale'", function() {
    //     // Since we want the title from the page, we need to manually handle the Promise
    //     return driver.getTitle().then(function(title) {
    //         assert.include("Auto Auction - Copart USA");
    //     });
    // });
    
    // If you don’t want to use promises, you can use awaits.  
    // This is easier to understand than to use promise…. then(function()).
    it("The title is 'Auto Auction - Copart USA - Salvage Cars For Sale'", async function(){
        var title = await driver.getTitle();
        return assert.include(title, "Auto Auction - Copart USA");
    });

    // have to do find element
    it("Should search on copart for porsche", async function(){
        var element = await driver.findElement(By.id("input-search"));
        return element.sendKeys("Exotic" + Key.ENTER);
    });

    it("Should assert Porsche is in list of results", async function() {
        await driver.wait(until.titleContains('Exotic For Auction at Copart'), 12000);
        console.log(await driver.getTitle());
        var html = await driver.findElement(By.tagName("body")).getAttribute('innerHTML');
        // console.log(html);
        return assert.include(html, "Porsche");
    });

});








