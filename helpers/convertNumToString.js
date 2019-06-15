module.exports = {
    numToStr: numToString,
    getNum: getNum
};

function numToString(number){
    var stringNum = "";
    var s_number = number + "";
    
    if(number === 0){        
        stringNum = "zero";
    }
    if(number > 0 && number < 999){
        stringNum = getNum(number);
    }
    else{
        // Billions
        var billion = getSubString(s_number, 12,11,10);
        if (billion > 0){
            stringNum = stringNum + " " + getNum(billion)  + " billion";
            s_number = strTrim(s_number, 12,11,10);
        }
        else{
            //Billion 000
            stringNum = stringNum;
        }

        //Millsons
         var million = getSubString(s_number, 9,8,7);
        if (million > 0){
            stringNum = stringNum + " " + getNum(million)  + " million";
            s_number = strTrim(s_number, 9,8,7);
        }
        else{
            //Millon 000
            stringNum = stringNum;
        }

        // Thousands
        var thousand = getSubString(s_number, 6,5,4);
        if (thousand > 0){
            stringNum = stringNum + " " + getNum(thousand)  + " thousand";
        }
        else{
            //thousand 000
            stringNum = stringNum;
        }
        // Hundreds
        var hundred = s_number.substring(s_number.length-3);
        stringNum = stringNum + " " + getNum(hundred); 
    }
    return stringNum;
}

function getSubString(s_number, num1, num2, num3){
    var sbstr;

    switch(s_number.length){
        case num1:
            sbstr = s_number.substring(s_number.length-num1, s_number.length-(num1-3));
            s_number = s_number.slice(3);
            break;
        case num2:
            sbstr = s_number.substring(s_number.length-num2, s_number.length-(num1-3));
            break;
        case num3:
            sbstr = s_number.substring(s_number.length-num3, s_number.length-(num1-3));
            break;
        default:
            sbstr = 0;
            break;
    }
    return sbstr;
}

function strTrim(s_number, num1, num2, num3){   
    if(s_number.length == num1){
        s_number = s_number.slice(3);
    }
    if(s_number.length == num2){
        s_number = s_number.slice(2);
    }
    if (s_number.length == num3){
        s_number = s_number.slice(1);
    }
    return s_number;
}

function getNum(number){    
    var threeDigitNum = "";
    var s_number = number +"";
    let digits= ['', 'one', 'two', 'three', 'four', 'five', 'six','seven','eight', 'nine','ten','eleven','twelve', 'thirteen', 'fourteen','fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    let tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']; 
    
    if (s_number.length < 3 && number < 20){
        threeDigitNum = digits[number];
    }
    else{
        //get hundred value
        if(s_number.length === 3){
            var num = s_number.substring(s_number.length-3,1);
            if(num > 0){
            threeDigitNum = threeDigitNum + digits[num] + " hundred";
            }
            else{
                threeDigitNum = threeDigitNum;
            }
        }
        //get tens value
        var tensNum = s_number.substring(s_number.length-2,3);
        if(tensNum === 00){
            threeDigitNum = threeDigitNum;
        }
        if(tensNum > 0){         
            if(tensNum >= 20){
                threeDigitNum = threeDigitNum + " "+ tens[tensNum[0]];
            }
            if(tensNum > 1 && tensNum <= 19){
                threeDigitNum = threeDigitNum + " " + digits[tensNum];
           }
           else{
                var oneNum = tensNum[1];
                threeDigitNum = threeDigitNum + " " + digits[oneNum];
           }
        }
    }
    return threeDigitNum;
}