require('chromedriver')
var webdriver = require('selenium-webdriver')
var assert = require('chai').assert
const driverManager = require('../common/driver')
var By = webdriver.By
var until = webdriver.until
var Key = webdriver.Key

describe('challenge 1 suite', function(){
    this.timeout(34000)
    var driver

    before(() => {
        driver = driverManager.getDriver('chrome')
        return driver
    })

    after(() => {
        return driver.quit()
    })

    describe('GoTo Google.com', () => {
        it('It should open the google website', () => {
            return driver.get('http://www.google.com')
        })
        
        it('The title is "Google"', async () => {
            driver.wait(until.elementLocated(By.xpath('//title[.="Google"]')), 20000)
            var title = await driver.getTitle()
            return assert.equal(title, 'Google')
        })
    })

    describe('Search for Porsche', () => {
        it('should set search for Porsche', async () => {
            var element = await driver.findElement(By.name('q'))
            return element.sendKeys('Porsche' + Key.ENTER)
        })

        it('Should assert 911 is in list of results', async () => {
            await driver.wait(until.titleContains('Porsche'), 10000)
            var html = await driver.findElement(By.tagName('body')).getAttribute('innerHTML')
            return assert.include(html, '911')
        })
    })
})





