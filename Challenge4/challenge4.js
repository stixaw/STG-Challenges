require('chromedriver');
// var webdriver = require('selenium-webdriver');
var assert = require("chai").assert;
const fibonacci = require('./fibonacci');
const convertNumToString = require('./convertNumToString');

//const {Builder, By, until, Key} = require('selenium-webdriver');
// var By = webdriver.By;
// var until = webdriver.until;
// var Key = webdriver.Key;


describe("challenge1 suite", function(){
    this.timeout(34000);
    var driver;

//     before(function () {
//     // initializing chrome driver
//     //    driver = new webdriver.Builder()
//     //    .withCapabilities(webdriver.Capabilities.chrome())
//     //    .build();
//         driver = new Builder().forBrowser('chrome').build();
//     });

//     after(function () {
//         return driver.quit();
//     });

    it("Fibonacci series", function () {
        console.log(fibonacci.fibonacci(0));
        console.log(fibonacci.fibonacci(1));
        console.log(fibonacci.fibonacci(2));
        console.log(fibonacci.fibonacci(3));
        console.log(fibonacci.fibonacci(4));

    });

    it("Different solution using an array and iteration", function(){
        fibonacci.fib_series(4);
    });
    
});
