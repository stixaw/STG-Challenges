module.exports = {
    numToStr: numToString,
    getNum: getNum
}

function numToString(number){
    var stringNum = "";
    var s_number = number + "";
    
    if(number < 1){
        stringNum = "Zero";
    }
    
    var hundred = s_number.substring(s_number.length-3, (s_number.length-3)+3, 10);
    if (hundred > 0){
        stringNum = getNum(hundred);
    }

    var thousand = s_number.substring(s_number.length-6,(s_number.length-6)+6, 10);
    if (thousand > 0){
        stringNum = getNum(thousand) + " thousand";
    }

    var million = s_number.substring(s_number.length-9,(s_number.length-9)+9, 10);
    if (million > 0){
        stringNum = getNum(million) + " million";
    }

    var billion = s_number.substring(s_number.length-12,(s_number.length-12)+12, 10);
    if (billion > 0){
        stringNum = getNum(billion) + " billion";
    }

    return stringNum;

}

//100,100,100
//one hundred million, one hundred thousand, one hundred

function getNum(number){
    
    var threeDigitNum = "";
    var s_number = number + "";

    let digits= ['', 'one', 'two', 'three', 'four', 'five', 'six','seven','eight', 'nine','ten','eleven','twelve', 'thirteen', 'fourteen','fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
    let tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
    
    if (number < 20){
        threeDigitNum = digits[number]
    }
    else{
        //get hundred value
        if(number > 0){
            threeDigitNum = threeDigitNum + digits[number] + " hundred";
        }

        //get tens value
        if(number >= 20){
            threeDigitNum = threeDigitNum + tens[number];
        }

        //get singles value
        if(number >= 9){
            threeDigitNum = threeDigitNum + digits[number];
        }

    }
    return threeDigitNum;

}