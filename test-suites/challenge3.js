require('chromedriver');
var webdriver = require('selenium-webdriver');
var assert = require('chai').assert;
const driverManager = require('../common/driver')
var By = webdriver.By;
var until = webdriver.until;
var Key = webdriver.Key;

describe('challenge 3 suite', function(){
    this.timeout(34000);
    var driver;

    before(() => {
        driver = driverManager.getDriver('chrome');
        return driver;
    })

    after(function () {
        return driver.quit();
    })

    describe('GoTo Copart.com', () => {
        it('It should open the copart website', () => {
            return driver.get("http://www.copart.com");
        })
        
        it('should have Copart USA title on page', async () =>{
            driver.wait(until.elementLocated(By.css('[ng-bind-html="title"]')), 20000)
            var title = await driver.getTitle();
            return assert.include(title, "Auto Auction - Copart USA");
        })
    })

    describe('Most Popular Searches', () => {
        // have to do find li console log the element attribute using while loop
        it('should get href for each popular search using while loop and print to console', async () =>{
            var popular_array = await driver.findElements(By.xpath("//div[@ng-if='popularSearches']//ul/li/a"));
            count = 0;

            while(count < popular_array.length){
                var text = await popular_array[count].getText();
                var html = await popular_array[count].getAttribute("href");
                console.log(text + " - " + html);
                count ++;
            }
        })

        //for loop:
        it('should get href for each popular search using for loop and print to console', async () => {
            var popular_array = await driver.findElements(By.xpath("//div[@id='tabTrending']//a"));
            console.log(popular_array.length);

            for(var i = 0; i < popular_array.length; i++){
                var text = await popular_array[i].getText();
                var html = await popular_array[i].getAttribute("href");
                console.log(text + " - " + html);
            }
        })
    })
})
