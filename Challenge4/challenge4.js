require('chromedriver');
// var webdriver = require('selenium-webdriver');
//var assert = require("chai").assert;
const fib = require('./fibonacci');
const numToString = require('./convertNumToString');

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

    // it("Fibonacci series", function () {
    //     console.log(fib.fibonacci(0));
    //     console.log(fib.fibonacci(1));
    //     console.log(fib.fibonacci(2));
    //     console.log(fib.fibonacci(3));
    //     console.log(fib.fibonacci(4));

    // });

    it("Different solution using an array and iteration", function(){
        fib.fib_series(5);
    });

    it("challenge returns fib and string", function(){
        console.log(numToString.numToStr(fib.fibonacci(5)));
    });
    
});
