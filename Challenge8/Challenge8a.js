var request = require('request')
var http = require('http')

/*
    For this challenge, use the copart web service to search for Toyota Camry and grab the data and 
    output it to a log file.  
    Here’s the search end point.
    https://www.copart.com/public/lots/search

    The request method would be a POST.
    For the form data, you will be passing the “query: toyota camry”
    
    The results returned will look like this:
    {"returnCode":1,"returnCodeDesc":"Success","data":{"query":{"query":["toyota camry"],"page":0,"size":20,
    "start":0,"watchListOnly":false,"freeFormSearch":true,"hideImages":false,"defaultSort":false,
    "specificRowProvided":false},"results":{"totalElements":5090,"content":[{"lotNumberStr":"31429677",
    "ln":31429677,"mkn":"TOYOTA","lm":"CAM……

    Notice one of the items in the data is totalElements.  This tells you how many items are in the search results.  

    Grab that data and output it to a log file.

    Then run another query for “nissan skyline”.  The results might or might not return anything.  
    Output how many in the results are found.  Do this w/ 10 different search parameters of your favorite cars.
*/

describe('search for honda', function() {
    var formdata = 
    {
        "draw": "1",
        "columns[0][data]":"0",
        "columns[0][name]":"",
        "columns[0][orderable]":"false",
        "columns[0][search][regex]":"false",
        "columns[0][search][value]":"",
        "columns[0][searchable]":"true",
        "columns[10][data]":"10",
        "columns[10][name]":"",
        "columns[10][orderable]":"true",
        "columns[10][search][regex]":"false",
        "columns[10][search][value]":"",
        "columns[10][searchable]":"true",
        "columns[11][data]":"11",
        "columns[11][name]":"",
        "columns[11][orderable]":"true",
        "columns[11][search][regex]":"false",
        "columns[11][search][value]":"",
        "columns[11][searchable]":"true",
        "columns[12][data]":"12",
        "columns[12][name]":"",
        "columns[12][orderable]":"true",
        "columns[12][search][regex]":"false",
        "columns[12][search][value]":"",
        "columns[12][searchable]":"true",
        "columns[13][data]":"13",
        "columns[13][name]":"",
        "columns[13][orderable]":"true",
        "columns[13][search][regex]":"false",
        "columns[13][search][value]":"",
        "columns[13][searchable]":"true",
        "columns[14][data]":"14",
        "columns[14][name]":"",
        "columns[14][orderable]":"false",
        "columns[14][search][regex]":"false",
        "columns[14][search][value]":"",
        "columns[14][searchable]":"true",
        "columns[15][data]":"15",
        "columns[15][name]":"",
        "columns[15][orderable]":"false",
        "columns[15][search][regex]":"false",
        "columns[15][search][value]":"",
        "columns[15][searchable]":"true",
        "columns[1][data]":"1",
        "columns[1][name]":"",
        "columns[1][orderable]":"false",
        "columns[1][search][regex]":"false",
        "columns[1][search][value]":"",
        "columns[1][searchable]":"true",
        "columns[2][data]":"2",
        "columns[2][name]":"",
        "columns[2][orderable]":"true",
        "columns[2][search][regex]":"false",
        "columns[2][search][value]":"",
        "columns[2][searchable]":"true",
        "columns[3][data]":"3",
        "columns[3][name]":"",
        "columns[3][orderable]":"true",
        "columns[3][search][regex]":"false",
        "columns[3][search][value]":"",
        "columns[3][searchable]":"true",
        "columns[4][data]":"4",
        "columns[4][name]":"",
        "columns[4][orderable]":"true",
        "columns[4][search][regex]":"false",
        "columns[4][search][value]":"",
        "columns[4][searchable]":"true",
        "columns[5][data]":"5",
        "columns[5][name]":"",
        "columns[5][orderable]":"true",
        "columns[5][search][regex]":"false",
        "columns[5][search][value]":"",
        "columns[5][searchable]":"true",
        "columns[6][data]":"6",
        "columns[6][name]":"",
        "columns[6][orderable]":"true",
        "columns[6][search][regex]":"false",
        "columns[6][search][value]":"",
        "columns[6][searchable]":"true",
        "columns[7][data]":"7",
        "columns[7][name]":"",
        "columns[7][orderable]":"true",
        "columns[7][search][regex]":"false",
        "columns[7][search][value]":"",
        "columns[7][searchable]":"true",
        "columns[8][data]":"8",
        "columns[8][name]":"",
        "columns[8][orderable]":"true",
        "columns[8][search][regex]":"false",
        "columns[8][search][value]":"",
        "columns[8][searchable]":"true",
        "columns[9][data]":"9",
        "columns[9][name]":"",
        "columns[9][orderable]":"true",
        "columns[9][search][regex]":"false",
        "columns[9][search][value]":"",
        "columns[9][searchable]":"true",
        "draw":"1","freeFormSearch":"true",
        "length":"100",
        "page":"0",
        "query":"honda",
        "search[regex]":"false",
        "search[value]":"",
        "size":"100",
        "start":"0",
        "watchListOnly":"false"
    }
    var cookie = 's_ppvl=%5B%5BB%5D%5D; visid_incap_242093=xkACFTEiTNWaPqasMe1J2DfiUF0AAAAAQUIPAAAAAAAqJHatPHhjMNPHl3TavpIp; incap_ses_1179_242093=p33EfO8NNgQRU9MKl6ZcEDfiUF0AAAAAxR/p0aGu2N8yqKAZiIHTCQ==; s_fid=3BFC35D460630745-31354C77F43D45F6; s_pv=member%3AsearchResults; s_vnum=1568173883429%26vn%3D1; s_invisit=true; s_lv_s=First%20Visit; s_nr=1565581884413-New; s_lv=1565581884416; s_sq=copart-g2-us-prod%3D%2526c.%2526a.%2526activitymap.%2526page%253Dmember%25253AsearchResults%2526link%253D%25252Fimages%25252Ficons%25252Ficon_Search_Desktop.svg%2526region%253Dsearch-form%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253Dmember%25253AsearchResults%2526pidt%253D1%2526oid%253D%25250A%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%25250A%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%2526oidt%253D3%2526ot%253DSUBMIT; s_ppv=member%253AsearchResults%2C66%2C28%2C712%2C1365%2C712%2C1440%2C900%2C2%2CP; g2usersessionid=c5b2569f1ff735589559c3b0f42c764e; G2JSESSIONID=81A21C7E3D651D7BC24FEC7ABC9DF0B7-n1'

    var my_headers = {
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'authority': 'www.copart.com',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'cookie': cookie
    }

    var url = 'https://www.copart.com/public/lots/search'
    // var url = 'https://www.copart.com/lotSearchResults/?free=true&query=honda'


    it ('search for honda', () => {
        var searchstuff = ['honda', 'toyota', 'GMC', 'subaru', 'ford', 'pinto', 'porsche', 'camry', 'civic', 'mazda']
        const fs = require('fs')

        request.post({url,
                formdata: formdata,
                headers: my_headers
            }, function(err, response, body){
                    // console.log(response)
                    var jobj = JSON.parse(response.body);
                    console.log(jobj.data.query[0] + " - " + jobj.data.results.totalElements);
                    // var jsonres = JSON.parse(response.body)
                    // var message = (jsonres.data.query.query[0] + '--' + jsonres.data.results.totalElements)
                    // console.log(message)
                    // fs.appendFile(data.txt, message + '\n', function (err) {
                    //     if (err) throw err;
                    // })
                }
            )
    })
})



