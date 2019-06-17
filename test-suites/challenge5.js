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

    describe('Search for exotic', () => {
        // find search and type Porsche
        it("should load a page with Exotic in the title", async () => {
            var element = await driver.findElement(By.id("input-search"))
            element.sendKeys("Exotic" + Key.ENTER)
            await driver.wait(until.titleContains('Exotic'), 26000) 
        })
    })

    describe('Search results for Porche', () => {
        it('should find PORSCHE in results', async () => {
            var element = await driver.findElement(By.xpath('//*[@id="serverSideDataTable_filter"]/label/input'))
            await element.sendKeys("Porsche")
            element.sendKeys(Key.ENTER)

            await driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//table[@id="serverSideDataTable"]//tbody', 10000))))
            var html = await driver.findElement(By.id('serverSideDataTable')).getAttribute('innerHTML')
            return assert.include(html, "PORSCHE")
        })
    })

    describe('Change Show Entries to 100', () => { 
        it('should assert show entries is set to 100', async () => {
            var element = await driver.findElement(By.xpath('//select[@name="serverSideDataTable_length"]'))
            await element.click()
            await element.sendKeys("100")
            element.sendKeys("Enter")
            element.click();
            return driver.wait(until.elementIsNotVisible(driver.findElement(By.id('serverSideDataTable_processing',10000))))
        })
    })

    describe('Return data', () => {
        // get the results for exotic
        it('should return data from the table in dictionary and print results to console', async () => {
            var tableData_array = await driver.findElements(By.xpath('//*[@data-uname="lotsearchLotmodel"]'))
            var sorted_Models = tableData_array.sort(dictHelper.sortfunction)
            var model_dict = {}

            for(var i = 0; i < sorted_Models.length-1; i++){
                var model = await sorted_Models[i].getText()
                dictHelper.addPairValue(model, model_dict)
            }

            console.log('***model: count***')
            for(var key in model_dict){
                var num = model_dict[key]
                console.log(await key, num)
            }
        })
    })

    describe('Damage Types and Count', () => {
        it('Should print out damage types and count using switch statement and print to console', async () => {
            var tableData_array = await driver.findElements(By.xpath('//*[@data-uname="lotsearchLotdamagedescription"]'))
            var damage_dict = {}

            for(var i = 0; i < tableData_array.length-1; i++){
                var damageType = await tableData_array[i].getText()
                switch(damageType){
                    case 'REAR END':
                        dictHelper.addPairValue(damageType, damage_dict)
                        break
                    case 'FRONT END':
                        dictHelper.addPairValue(damageType, damage_dict)
                        break
                    case 'MINOR DENT/SCRATCHES':
                        dictHelper.addPairValue(damageType, damage_dict)
                        break
                    case 'UNDERCARRIAGE':
                        dictHelper.addPairValue(damageType, damage_dict)
                        break
                    default:
                        dictHelper.addPairValue('MISC', damage_dict)
                        break
                }
            }
            console.log('***damage: count***')
            for(var key in damage_dict){
                var num = damage_dict[key]
                console.log(key, num)
            }
        })
    })
})
