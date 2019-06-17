require('chromedriver')
var webdriver = require('selenium-webdriver')
var assert = require('chai').assert
const driverManager = require('../common/driver')
var By = webdriver.By
var until = webdriver.until

describe("challenge 6 suite", function (){
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
        it('should open the copart website', () => {
            return driver.get("http://www.copart.com")
        })
        
        it('should have Copart USA title on page', async () =>{
            driver.wait(until.elementLocated(By.css('[ng-bind-html="title"]')), 20000)
            var title = await driver.getTitle()
            return assert.include(title, "Auto Auction - Copart USA")
        })
    })

    describe('Search for Nissan', () => {
        // search for Nissan
        it('should find results for nisson', async () =>{
            var element = await driver.findElement(By.id("input-search"))
            element.sendKeys("nissan")
            var click = await driver.findElement(By.xpath('//*[@ng-click="search()"]'))
            await click.click()

            await driver.wait(until.titleContains('nissan'), 20000)
            var html = await driver.findElement(By.tagName("body")).getAttribute('innerHTML')
            return assert.include(html, "NISSAN")
        })
    })

    describe('Search for Skyline', () => {
            // find model and click it and do stuff till it blows up
        it('should try to find a model with Skyline in results', async () => {
            var modelFilter = await driver.findElement(By.xpath('//*[@data-uname="ModelFilter"]'))
            await modelFilter.click()
            
            try {
                //search for skyline model
                driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//*[@id="collapseinside4"]//input[1]'))))
                var searchInput = await driver.findElement(By.xpath('//*[@id="collapseinside4"]//input[1]'))
                await searchInput.sendKeys('skyline')
               
                //if skyline is unavailable this element will not be seen
                var results = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//div[@id="collapseinside4"]//li'))))
                if(results){
                    var applyFilter = await driver.findElement(By.xpath('//abbr[contains(text(),"Skyline")]'))
                    await applyFilter.click()
                    var html = await driver.findElement(By.tagName("body")).getAttribute('innerHTML')
                    return assert.include(html, 'SKYLINE')
                }
            }
            catch (error) {
                driverManager.takeScreenshot(driver, 'skyline_screenshot')
                var err = 'skylineNotFound!'
                console.log('Error Thrown: ',err)
            }
        })
    })
})
