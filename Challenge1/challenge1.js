require('chromedriver');
var webdriver = require('selenium-webdriver');
var assert = require("chai").assert;

describe("challenge1 suite", function(){
    this.timeout(20000);
    var driver;

    before(function () {
    // initializing chrome driver
       driver = new webdriver.Builder()
       .withCapabilities(webdriver.Capabilities.chrome())
       .build();
    });

    after(function () {
        return driver.quit();
    });

    it("It should open the google website", function() {
        return driver.get("http://www.google.com");
    });
    
    // it("The title is 'Google'", function() {
    //     // Since we want the title from the page, we need to manually handle the Promise
    //     return driver.getTitle().then(function(title) {
    //         assert.equal(title, "Google");
    //     });
    // });
    // If you don’t want to use promises, you can use awaits.  
    // This is easier to understand than to use promise…. then(function()).
    it("The title is 'Google'", async function() {
        var title = await driver.getTitle();
        return assert.equal(title, "Google");
    });

    it("Should run search on google for porsche", async function() {
        var element = await driver.findElement(By.name("q"));
        return element.sendKeys("Porsche" + Key.ENTER)
    });

    it("Should assert 911 is in list of results", async function() {
        await driver.wait(until.titleContains('Porsche'), 10000);
        console.log(await driver.getTitle());
        var html = await driver.findElement(By.tagName("body")).getAttribute('innerHTML');
        // console.log(html);
        return assert.include(html, "911");
    });
});





