require('chromedriver');
var webdriver = require('../node_modules/selenium-webdriver');
var assert = require('../node_modules/chai').assert;
const driverManager = require('../common/driver');
// var screenshot = require('../common/screenshot')
var Key = webdriver.Key;
var By = webdriver.By;
var until = webdriver.until;

describe("challenge1 suite", function(){
    this.timeout(34000);
    var driver;

    before(async function () {

        driver = await driverManager.getDriver('chrome');
        return driver;
    });

    after(function () {
        return driver.quit();
    });

    it("It should open the copart website", async function() {
        return await driver.get("http://www.copart.com");
    });
    
    it("The title is 'Auto Auction - Copart USA - Salvage Cars For Sale'", async function(){
        var title = await driver.getTitle();
        return assert.include(title, "Auto Auction - Copart USA");
    });

    // find search and type Porsche
    it("Should search on copart for exotic", async function(){
        var element = await driver.findElement(By.id("input-search"));
        element.sendKeys("Exotic" + Key.ENTER);
        await driver.wait(until.titleContains('Exotic'), 26000) 

    });

    it("Should search results for Porsche", async function(){
        var element = await driver.findElement(By.xpath('//*[@id="serverSideDataTable_filter"]/label/input'));
        await element.sendKeys("Porsche");
        element.sendKeys(Key.ENTER);

        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//table[@id="serverSideDataTable"]//tbody', 10000))))
        var html = await driver.findElement(By.id('serverSideDataTable')).getAttribute('innerHTML');
        return assert.include(html, "PORSCHE");

    });

    //change the  drop down for “Show Entries” to 100 from 20. 
    it("Should assert show entries is set to 100", async function() {
        var element = await driver.findElement(By.xpath('//select[@name="serverSideDataTable_length"]'));    
        await element.click();
        await element.sendKeys("100");
        element.sendKeys("Enter");
        element.click();

        // var displayProp = await driver.findElement(By.id('serverSideDataTable_processing')).getAttribute("display");
        // await driver.wait(until.elementTextContains(displayProp, 'none'));
        return driver.wait(until.elementIsNotVisible(driver.findElement(By.id('serverSideDataTable_processing',10000))));

    });
    
    function sortfunction(a, b){
        return (a - b) 
    }

    function addPairValue(item, dict){
        if (item in dict){
            dict[item] += 1;
        }
        else{
            dict[item] = 1;
        }
    }

    // get the results for exotic

    it("Should get all data from the table", async function() {
        var tableData_array = await driver.findElements(By.xpath('//*[@data-uname="lotsearchLotmodel"]'));
        var sorted_Models = tableData_array.sort(sortfunction);
        var model_dict = {};

        for(var i = 0; i < sorted_Models.length-1; i++){
            var model = await sorted_Models[i].getText();
            if (model in model_dict){
                model_dict[model] += 1;
            }
            else{
                model_dict[model] = 1;
            }
        }

        console.log('***model: count***');
        for(var key in model_dict){
            var num = model_dict[key];
            console.log(await key, num);
        }

    });

    it("Should print out damage types and count using switch statement", async function() {
        var tableData_array = await driver.findElements(By.xpath('//*[@data-uname="lotsearchLotdamagedescription"]'));
        var damage_dict = {};

        for(var i = 0; i < tableData_array.length-1; i++){
            var damageType = await tableData_array[i].getText();
            switch(damageType){
                case 'REAR END':
                    addPairValue(damageType, damage_dict);
                    break;
                case 'FRONT END':
                    addPairValue(damageType, damage_dict);
                    break;
                case 'MINOR DENT/SCRATCHES':
                    addPairValue(damageType, damage_dict);
                    break;
                case 'UNDERCARRIAGE':
                    addPairValue(damageType, damage_dict);
                    break;
                default:
                    addPairValue('MISC', damage_dict);
                    break;
            }
        }
        console.log('***damage: count***');
        for(var key in damage_dict){
            var num = damage_dict[key];
            console.log(key, num);
        }

    });

});

//displayProp approach:
// var displayProp = await driver.findElement(By.id('serverSideDataTable_processing')).getAttribute("display");
// console.log(displayProp);
// await driver.wait(until.elementTextContains(displayProp, 'none'));

//challenge 3:
    
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
