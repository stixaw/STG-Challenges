require('chromedriver')
var webdriver = require('selenium-webdriver')
var assert = require('chai').assert
const driverManager = require('../common/driver')
var By = webdriver.By
var until = webdriver.until
var Key = webdriver.Key

describe('challenge 2 suite', function(){
    this.timeout(34000)
    var driver

    before(() => {
        driver = driverManager.getDriver('chrome')
        return driver
    })

    after(function () {
        return driver.quit()
    })

    describe('GoTo Copart.com', () => {
        it('It should open the copart website', () => {
            return driver.get("http://www.copart.com")
        })
        
        it('should have Copart USA title on page', async () =>{
            driver.wait(until.elementLocated(By.css('[ng-bind-html="title"]')), 20000)
            var title = await driver.getTitle()
            return assert.include(title, "Auto Auction - Copart USA")
        })
    })

    describe('Search for exotic and find Porsche in results', () => {
        // have to do find element
        it('should find Exotic results', async () => {
            var element = await driver.findElement(By.id("input-search"))
            return element.sendKeys("Exotic" + Key.ENTER)
        })

        it('should find PORSCHE in results', async function() {
            await driver.wait(until.titleContains('Exotic For Auction at Copart'), 20000)
            var html = await driver.findElement(By.tagName("body")).getAttribute('innerHTML')
            return assert.include(html, "Porsche")
        })
    })
})
