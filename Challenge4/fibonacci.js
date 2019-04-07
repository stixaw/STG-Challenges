module.exports = {
    fibonacci: fibonacci,
    fib_series: fib_series
 }

function fibonacci(number){

  var result;
    
  if (number<= 1) {
    result = number;
    return result;
  };
   
  result = fibonacci(number - 1) + fibonacci(number - 2);
  return result;
    
}

function fib_series(n){
  let arr = [0, 1];
  for (let i = 2; i < n + 1; i++){
    arr.push(arr[i - 2] + arr[i -1])
  }
  //return arr[n]
  //return arr
  for (i = 0; i < arr.length; i++){
    console.log(arr[i]);
  }
};
