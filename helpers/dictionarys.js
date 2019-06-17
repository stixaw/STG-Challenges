module.exports = {
    sortfunction: sortfunction,
    addKeyValuePair: addKeyValuePair
}

function sortfunction(a, b){
    return (a - b)
}

function addKeyValuePair(item, dict){
    if (item in dict){
        dict[item] += 1
    }
    else{
        dict[item] = 1
    }
}