require('chromedriver')
webdriver = require('selenium-webdriver')
assert = require('chai').assert
driverManager = require('../common/driver')
By = webdriver.By
until = webdriver.until

/*
 why not build a map of all the links on a certain section.  
 X For this challenge, take a look at https://www.copart.com main page.  
 X Go to the Makes/Models section of the page.  
 X Create a 2 dimensional array that stores all the values displayed on the page along w/ the URL for that link.  
 X Once you have this array, you can verify all the elements in the array navigates to the correct page.  
 X Don’t forget to verify some piece of data on the page.  
 To get started, inspect the code and notice the section of the page is built using angular.  
 There is no static id or element class that identifies each element in this section.  
 Everything is generic.  
 The only way to build a function/object for this section is to loop through each element.  
 Hint: xpath is easiest.  ***Note, you did part of this in challenge 3.
*/

describe("challenge 7 suite", function (){
    this.timeout(300000)
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
            return driver.get("http://www.copart.com")
        })
        
        it('should have Copart USA title on page', async () =>{
            driver.wait(until.elementLocated(By.css('[ng-bind-html="title"]')), 20000)
            var title = await driver.getTitle()
            return assert.include(title, "Auto Auction - Copart USA")
        })
    })

    describe('Walk Popular Makes and Models searches', () => {
        let array_of_Arrays = new Array()

        it('should get href and model for each popular search', async () => {
            const popular_array = await driver.findElements(By.xpath("//div[@ng-if='popularSearches']//ul/li/a"));
            let href
            let carModel
            count = 0;

            while(count < popular_array.length){
                let pair_array = []
                carModel = await popular_array[count].getText()
                pair_array.push(carModel)

                href = await popular_array[count].getAttribute("href")
                pair_array.push(href)

                //add pair_array to array of arrays
                array_of_Arrays.push(pair_array)
                count ++
            }
            return assert(array_of_Arrays.length === 20)
        })

        it('Should go to each url in Array of Arrays confirms carModel on page', async () => {
            let carModel
            let carUrl

            for(var i = 0; i < array_of_Arrays.length; i++){
                var urlPair = array_of_Arrays[i]
                carModel = urlPair[0]
                carUrl = urlPair[1]
                
                try{
                    console.log(`Url ${i} - ${carUrl}`)
                    driver.get(carUrl)
                    let innerHTML = await driver.findElement(By.tagName('body')).getAttribute('innerHTML')
                    if(innerHTML.indexOf(carModel) !== -1)
                        assert.isTrue(innerHTML.indexOf(carModel) !== -1)
                }
                catch (error) {
                    driverManager.takeScreenshot(driver, carModel + '_screenshot')
                    var err = carModel + 'NotFound!'
                    console.log('Error Thrown: ',err)
                }
            }
        })
    })
})
