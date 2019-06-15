require('chromedriver');
var webdriver = require('../node_modules/selenium-webdriver');
var assert = require('../node_modules/chai').assert;
const driverManager = require('../common/driver');
var By = webdriver.By;
var until = webdriver.until;
var Key = webdriver.Key;

/*
 why not build a map of all the links on a certain section.  
 For this challenge, take a look at https://www.copart.com main page.  
 Go to the Makes/Models section of the page.  
 Create a 2 dimensional array that stores all the values displayed on the page along w/ the URL for that link.  
 Once you have this array, you can verify all the elements in the array navigates to the correct page.  
 Don’t forget to verify some piece of data on the page.  
 To get started, inspect the code and notice the section of the page is built using angular.  
 There is no static id or element class that identifies each element in this section.  
 Everything is generic.  The only way to build a function/object for this section is to loop through each element.  
 Hint: xpath is easiest.  ***Note, you did part of this in challenge 3.
*/

describe("challenge 7 suite", function (){
    this.timeout(34000);
    var driver;

    before(() => {
        driver = driverManager.getDriver('chrome');
        return driver;
    })

    after(function () {
        return driver.quit();
    })

    describe('Setup Test Open Copart Website', () => {
        it('should open the copart website', () => {
            return driver.get("http://www.copart.com");
        })
        
        it('should have Copart USA title on page', async () =>{
            driver.wait(until.elementLocated(By.css('[ng-bind-html="title"]')), 20000)
            var title = await driver.getTitle();
            return assert.include(title, "Auto Auction - Copart USA");
        })
    })

    // find search and type Nissan
    it("Should search on copart for Nissan", async function(){
        var element = await driver.findElement(By.id("input-search"));
        element.sendKeys("nissan");
        var click = await driver.findElement(By.xpath('//*[@ng-click="search()"]'));
        click.click();
        var displayProp = await driver.findElement(By.id('serverSideDataTable_processing')).getAttribute("display");
        await driver.wait(until.elementTextContains(displayProp, 'none'));
    });

    // get the results for Nissan
    it("Should assert Nissan is in list of results", async function() {
        await driver.wait(until.titleContains('Nissan'), 12000);
        var html = await driver.findElement(By.tagName("body")).getAttribute('innerHTML');
        // console.log(html)
        return assert.include(html, "Nissan");
    });

        // find model and click it and do stuff till it blows up
    it('Using Filter options find model, search for Skyline', async function(){
        try {
            //click model
            var modelElement = await driver.findElement(By.xpath('//*[@data-uname="ModelFilter"]/i'));
            modelElement.click();
            driver.wait(driver.findElement(By.xpath('//*[@id="collapseinside4"]//input[1]')));
            
        }
        catch (error) {
            
        }
        finally{

        } 
    })
});

//challenge5
// //change the  drop down for “Show Entries” to 100 from 20. 
// it("Should assert show entries is set to 100", async function() {
//     var element = await driver.findElement(By.xpath('//select[@name="serverSideDataTable_length"]'));    
//     await element.click();
//     await element.sendKeys("100");
//     element.sendKeys("Enter");
//     element.click();
//     return driver.wait(until.elementIsNotVisible(driver.findElement(By.id('serverSideDatatTable_processsing', 10000))));

// it ("Should get all data in table", async function(){
//     //By.xpath(//*[@data-uname=“lotsearchLotmodel”])
// })

// it("Should print out damage types", async function(){
//     //By.xpath('')
// })

//from challenge 3
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