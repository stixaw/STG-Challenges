require('chromedriver')
var request = require('request')
webdriver = require('selenium-webdriver')
assert = require('chai').assert
driverManager = require('../common/driver')
By = webdriver.By
until = webdriver.until

/*
    For this challenge, use the copart web service to search for Toyota Camry and grab the data and 
    output it to a log file.  
    Here’s the search end point.
    https://www.copart.com/public/lots/search

    The request method would be a POST.
    For the form data, you will be passing the “query: toyota camry”
    
    The results returned will look like this:
    {"returnCode":1,"returnCodeDesc":"Success","data":{"query":{"query":["toyota camry"],"page":0,"size":20,
    "start":0,"watchListOnly":false,"freeFormSearch":true,"hideImages":false,"defaultSort":false,
    "specificRowProvided":false},"results":{"totalElements":5090,"content":[{"lotNumberStr":"31429677",
    "ln":31429677,"mkn":"TOYOTA","lm":"CAM……

    Notice one of the items in the data is totalElements.  This tells you how many items are in the search results.  

    Grab that data and output it to a log file.

    Then run another query for “nissan skyline”.  The results might or might not return anything.  
    Output how many in the results are found.  Do this w/ 10 different search parameters of your favorite cars.
*/

describe("challenge 8 suite", function (){
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
