require('chromedriver');
const {Builder, By, until, Key} = require('selenium-webdriver');
var assert = require("chai").assert;
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

    // have to do find li we need for the console.log
    it("Should find the Most Popular Items", async function(){

        var elements = await driver.findElements(By.xpath("//*[@id='tabTrending']//ul/li/a"));
        // var elements = await driver.findElements(By.xpath("//*[@id='tabTrending']/div[1]/div[2]/div/ul/li"));

        for(var i = 0; i < 20; i++){
            
            //var rootHtml = "https://www.copart.com"
            var text = await elements[i].getText();
            var html = await elements[i].getAttribute("href");
            //var htmlsub = html.substr(10,14)
            // console.log(text + " - " + rootHtml + htmlsub + text.toLowerCase());
            console.log(text + " - " + html);
        }

    });

    // it("Should assert Porsche is in list of results", async function() {
    //     await driver.wait(until.titleContains('Auto Auction - Copart USA'), 12000);
    //     console.log(await driver.getTitle()); 
    //     var html = await driver.findElement(By.tagName("body")).getAttribute('innerHTML');
    //     // console.log(html);
    //     return assert.include(html, "Porsche");
    // });


});
