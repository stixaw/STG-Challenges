require('chromedriver');
const {Builder, By, until, Key} = require('selenium-webdriver');
var assert = require("chai").assert;
// var By = webdriver.By;
// var until = webdriver.until;
// var Key = webdriver.Key;

describe("challenge1 suite", function(){
    this.timeout(34000);
    var driver;

    before(function () {
    // initializing chrome driver
    //    driver = new webdriver.Builder()
    //    .withCapabilities(webdriver.Capabilities.chrome())
    //    .build();
        driver = new Builder().forBrowser('chrome').build();
        driver.manage().window().maximize();
    });

    after(function () {
        return driver.quit();
    });

    it("It should open the copart website", async function() {
        return await driver.get("http://www.copart.com");
    });
    
    // If you don’t want to use promises, you can use awaits.  
    // This is easier to understand than to use promise…. then(function()).
    it("The title is 'Auto Auction - Copart USA - Salvage Cars For Sale'", async function(){
        var title = await driver.getTitle();
        return assert.include(title, "Auto Auction - Copart USA");
    });

    // find search and type porsche
    it("Should search on copart for porsche", async function(){
        var element = await driver.findElement(By.id("input-search"));
        return element.sendKeys("porsche" + Key.ENTER);
    });

    // get the results for porsche
    it("Should assert Porsche is in list of results", async function() {
        await driver.wait(until.titleContains('Porsche'), 12000);
        console.log(await driver.getTitle()); 
        var html = await driver.findElement(By.tagName("body")).getAttribute('innerHTML');
        // console.log(html);
        return assert.include(html, "Porsche");
    });

    //change the  drop down for “Show Entries” to 100 from 20. 
    it("Should assert show entries is set to 100", async function() {
        var ddClick= await driver.findElement(By.xpath('//*[@id="serverSideDataTable_length"]/label/select/a'), 12000);
        ddClick.getAttribute('innerHTML').;
        await driver.
        console.log(await driver.getTitle()); 
        var html = await driver.findElement(By.tagName("body")).getAttribute('innerHTML');
        // console.log(html);
        return assert.include(html, "Porsche");
    });


    // // have to do find li console log the element attribute using while loop
    // it("Should find the Most Popular Items", async function(){
    //     var popular_array = await driver.findElements(By.xpath("//div[@ng-if='popularSearches']//ul/li/a"));
    //     count = 0;

    //     while(count < popular_array.length){            
    //         //var rootHtml = "https://www.copart.com"
    //         //var htmlsub = html.substr(10,14)
    //         // console.log(text + " - " + rootHtml + htmlsub + text.toLowerCase());
    //         var text = await popular_array[count].getText();
    //         var html = await popular_array[count].getAttribute("href");
    //         console.log(text + " - " + html);
    //         count ++;
    //     }

    // });

    // //for loop:
    // it("loop through the Most Popular Items and print link and text", async function(){
    //     var popular_array = await driver.findElements(By.xpath("//div[@id='tabTrending']//a"));
    //     console.log(popular_array.length);

    //     for(var i = 0; i < popular_array.length; i++){            
    //         //var rootHtml = "https://www.copart.com"
    //         //var htmlsub = html.substr(10,14)
    //         // console.log(text + " - " + rootHtml + htmlsub + text.toLowerCase());
    //         var text = await popular_array[i].getText();
    //         var html = await popular_array[i].getAttribute("href");
    //         console.log(text + " - " + html);
    //     };

    // });


});
