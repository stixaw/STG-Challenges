const fib = require('../helpers/fibonacci')
const numToString = require('../helpers/convertNumToString')

describe("challenge 4 Fibonacci Functions", () => {
    it('should make individual calls to methods', () => {
        console.log(fib.fibonacci(0) + "...." + numToString.numToStr(fib.fibonacci(0)))
        console.log(fib.fibonacci(1) + "...." + numToString.numToStr(fib.fibonacci(1)))
        console.log(fib.fibonacci(2) + "...." + numToString.numToStr(fib.fibonacci(2)))
        console.log(fib.fibonacci(3) + "...." + numToString.numToStr(fib.fibonacci(3)))
        console.log(fib.fibonacci(4) + "...." + numToString.numToStr(fib.fibonacci(4)))
        console.log(fib.fibonacci(5) + "...." + numToString.numToStr(fib.fibonacci(5)))
        console.log(fib.fibonacci(6) + "...." + numToString.numToStr(fib.fibonacci(6)))
    })

    // it('should call a single function with a parameter of 30', () => {
    //     fib.fib_series(30)
    // })
})
