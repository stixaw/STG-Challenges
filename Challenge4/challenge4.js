require('chromedriver');
var converter = require('number-to-words');
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



        it("Fibonacci series and words", function () {
        console.log(fib.fibonacci(0) + "...." + numToString.numToStr(fib.fibonacci(0)));
        console.log(fib.fibonacci(5) + "...." + numToString.numToStr(fib.fibonacci(5)));
        console.log(fib.fibonacci(15) + "...." + numToString.numToStr(fib.fibonacci(15)));
        console.log(fib.fibonacci(20) + "...." + numToString.numToStr(fib.fibonacci(20)));
        console.log(fib.fibonacci(25) + "...." + numToString.numToStr(fib.fibonacci(25)));
        console.log(fib.fibonacci(35) + "...." + numToString.numToStr(fib.fibonacci(35)));

    });

    it("challenge returns fib and string", function(){
        fib.fib_series(30);

    });

});

    // it("Fibonacci series", function () {
    //     console.log(fib.fibonacci(0));
    //     console.log(fib.fibonacci(1));
    //     console.log(fib.fibonacci(2));
    //     console.log(fib.fibonacci(3));
    //     console.log(fib.fibonacci(4));

    // });

    // it("Different solution using an array and iteration", function(){
    //     fib.fib_series(5);
    // });

    // it("getNum function tests should handle up to 999", function(){
    //     console.log(numToString.getNum(1));
    //     console.log(numToString.getNum(99));
    //     console.log(numToString.getNum(999));
        
    // });

    // it("numToStr function tests should handle 999+", function(){
        // console.log(numToString.numToStr(1));
        // console.log(numToString.numToStr(199900));
        // console.log(numToString.numToStr(400500701));
        // console.log(numToString.numToStr(23400500701));
        
    // });