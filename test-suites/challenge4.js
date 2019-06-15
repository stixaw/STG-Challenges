const fib = require('../helpers/fibonacci');
const numToString = require('../helpers/convertNumToString');

describe("challenge 4 Fibonacci Functions", () => {
    it('should make individual calls to methods', () => {
        console.log(fib.fibonacci(0) + "...." + numToString.numToStr(fib.fibonacci(0)));
        console.log(fib.fibonacci(5) + "...." + numToString.numToStr(fib.fibonacci(5)));
        console.log(fib.fibonacci(15) + "...." + numToString.numToStr(fib.fibonacci(15)));
        console.log(fib.fibonacci(20) + "...." + numToString.numToStr(fib.fibonacci(20)));
        console.log(fib.fibonacci(25) + "...." + numToString.numToStr(fib.fibonacci(25)));
        console.log(fib.fibonacci(35) + "...." + numToString.numToStr(fib.fibonacci(35)));
    })

    it('should call a single function with a parameter of 30', () => {
        fib.fib_series(30);
    })
})
