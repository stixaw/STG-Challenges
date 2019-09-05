require('chromedriver')
var webdriver = require('selenium-webdriver')
var assert = require('chai').assert
const driverManager = require('../common/driver')
const dictHelper = require('../helpers/dictionarys')
var Key = webdriver.Key
var By = webdriver.By
var until = webdriver.until

describe("challenge 5 suite", function(){
    this.timeout(36000)
    var driver

    before(() => {
        driver = driverManager.getDriver('chrome')
        return driver
    })

    after(() => {
        return driver.quit()
    })

    describe('GoTo Copart.com', () => {
        it('It should open the copart website', () => {
            return driver.get('http://www.copart.com')
        })
        
        it('should have Copart USA title on page', async () => {
            driver.wait(until.elementLocated(By.css('[ng-bind-html="title"]')), 20000)
            var title = await driver.getTitle()
            return assert.include(title, 'Auto Auction - Copart USA')
        })
    })

    describe('Search for exotic', () => {
        // find search and type Porsche
        it('should load a page with Exotic in the title', async () => {
            var searchField = await driver.findElement(By.id('input-search'))
            searchField.sendKeys('Exotic' + Key.ENTER)
            await driver.wait(until.titleContains('Exotic'), 26000) 
        })
    })

    describe('Filter Porsche', () => {
        it('should find porsche in results after applying the filter PORSCHE', async () => {
            var searchField = await driver.findElement(By.css('#serverSideDataTable_filter input'))
            await searchField.click()
            await searchField.sendKeys("Porsche")
            searchField.sendKeys(Key.ENTER)

            await driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//table[@id="serverSideDataTable"]//tbody', 10000))))
            var html = await driver.findElement(By.id('serverSideDataTable')).getAttribute('innerHTML')
            return assert.include(html, "PORSCHE")
        })
    })

    describe('Change Show Entries to 100', () => { 
        it('should assert show entries is set to 100', async () => {
            var entriesControl = await driver.findElement(By.xpath('//select[@name="serverSideDataTable_length"]'))
            await entriesControl.click()
            await entriesControl.sendKeys("100")
            entriesControl.sendKeys("Enter")
            entriesControl.click();
            return driver.wait(until.elementIsNotVisible(driver.findElement(By.id('serverSideDataTable_processing',10000))))
        })
    })

    describe('Return data', () => {
        // get the results for exotic
        it('should return data from the table in dictionary and print results to console', async () => {
            var carModel_Array = await driver.findElements(By.xpath('//*[@data-uname="lotsearchLotmodel"]'))
            var sorted_Models = carModel_Array.sort(dictHelper.sortfunction)
            var model_dict = {}

            for(var i = 0; i < sorted_Models.length-1; i++){
                var model = await sorted_Models[i].getText()
                dictHelper.addKeyValuePair(model, model_dict)
            }

            console.log('***model: count***')
            for(var model in model_dict){
                var count = model_dict[model]
                console.log(model, count)
            }
        })
    })

    describe('Damage Types and Count', () => {
        it('Should print out damage types and count using switch statement and print to console', async () => {
            var carModel_Array = await driver.findElements(By.xpath('//*[@data-uname="lotsearchLotdamagedescription"]'))
            var damage_dict = {}

            for(var i = 0; i < carModel_Array.length-1; i++){
                var damageType = await carModel_Array[i].getText()
                switch(damageType){
                    case 'REAR END':
                        dictHelper.addKeyValuePair(damageType, damage_dict)
                        break
                    case 'FRONT END':
                        dictHelper.addKeyValuePair(damageType, damage_dict)
                        break
                    case 'MINOR DENT/SCRATCHES':
                        dictHelper.addKeyValuePair(damageType, damage_dict)
                        break
                    case 'UNDERCARRIAGE':
                        dictHelper.addKeyValuePair(damageType, damage_dict)
                        break
                    default:
                        dictHelper.addKeyValuePair('MISC', damage_dict)
                        break
                }
            }
            console.log('***damage: count***')
            for(var searchValue in damage_dict){
                var count = damage_dict[searchValue]
                console.log(searchValue, count)
            }
        })
    })
})
