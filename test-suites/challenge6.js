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
            var searchField = await driver.findElement(By.id("input-search"))
            searchField.sendKeys("nissan")
            var button = await driver.findElement(By.xpath('//*[@ng-click="search()"]'))
            await button.click()

            await driver.wait(until.titleContains('nissan'), 20000)
            await driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//table[@id="serverSideDataTable"]//tbody', 10000))))
            var html = await driver.findElement(By.id('serverSideDataTable')).getAttribute('innerHTML')
            return assert.include(html, "NISSAN")
        })
    })

    describe('Search for Skyline', () => {
            // find model and click it and do stuff till it blows up
        it('should try to find a model with Skyline in results', async () => {
            var modelFilter = driver.wait(until.elementLocated(By.xpath('//*[@data-uname="ModelFilter"]')), 20000)
            await modelFilter.click()
            
            try {
                //search for skyline model
                driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//div[@id="collapseinside4"]//input[@placeholder="Search"]'))))
                var searchInput = await driver.findElement(By.xpath('//div[@id="collapseinside4"]//input[@placeholder="Search"]'))
                await searchInput.sendKeys('skyline')
               
                var applyFilter = await driver.findElement(By.css('input#lot_model_descSKYLINE'))
                await applyFilter.click()
                await driver.wait(until.elementIsNotVisible(driver.findElement(By.id('serverSideDataTable_processing',10000))))
                var html = await driver.findElement(By.css('#serverSideDataTable tbody')).getAttribute('innerText')
                return assert.include(html, 'SKYLINE')
            }
            catch (error) {
                driverManager.takeScreenshot(driver, 'skyline_screenshot')
                var err = 'skylineNotFound!'
                console.log('Error Thrown: ',err)
            }
        })
    })
})
