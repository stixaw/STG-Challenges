var fs = require('fs')
module.exports = {
    takeScreenshot: takeScreenshot
}

function takeScreenshot(driver, name){
    driver.takeScreenshot()
    .then(function(base64Image){
        var decodedImage = new Buffer.from(base64Image,'base64');
        fs.writeFile("filename.jpg", decodedImage, function(err){console.log(err)});
        var d = new Date();
        var fn = name + d.getTime() + '.jpg';
        fs.writeFile('../screenshots/' + fn, decodedImage, function(err){});
        
    })
}