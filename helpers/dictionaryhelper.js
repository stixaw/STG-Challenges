module.exports = {
    sortfunction: sortfunction,
    addPairValue: addPairValue
}

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