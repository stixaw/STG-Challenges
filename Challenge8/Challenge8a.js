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
    var formdata = {
        'draw': '1',
        'columns[0][data]': '0',
        'columns[0][name]': '',
        'columns[0][searchable]': 'true',
        'columns[0][orderable]': 'false',
       ' columns[0][search][value]': '',
        'columns[0][search][regex]': 'false',
       ' columns[1][data]': '1',
        'columns[1][name]': '',
        'columns[1][searchable]': 'true',
        'columns[1][orderable]': 'false',
        'columns[1][search][value]': '',
        'columns[1][search][regex]': 'false',
        'columns[2][data]': '2',
        'columns[2][name]': '',
        'columns[2][searchable]': 'true',
        'columns[2][orderable]': 'true',
        'columns[2][search][value]': '',
        'columns[2][search][regex]': 'false',
        'columns[3][data]': '3',
        'columns[3][name]': '',
        'columns[3][searchable]': 'true',
        'columns[3][orderable]': 'true',
        'columns[3][search][value]': '',
        'columns[3][search][regex]': 'false',
        'columns[4][data]': '4',
        'columns[4][name]': '',
        'columns[4][searchable]': 'true',
        'columns[4][orderable]': 'true',
        'columns[4][search][value]': '',
        'columns[4][search][regex]': 'false',
        'columns[5][data]': '5',
        'columns[5][name]': '',
        'columns[5][searchable]': 'true',
        'columns[5][orderable]': 'true',
        'columns[5][search][value]': '',
        'columns[5][search][regex]': 'false',
        'columns[6][data]': '6',
        'columns[6][name]': '',
        'columns[6][searchable]': 'true',
        'columns[6][orderable]': 'true',
        'columns[6][search][value]': '',
        'columns[6][search][regex]': 'false',
        'columns[7][data]': '7',
        'columns[7][name]': '',
        'columns[7][searchable]': 'true',
        'columns[7][orderable]': 'true',
        'columns[7][search][value]': '',
        'columns[7][search][regex]': 'false',
        'columns[8][data]': '8',
        'columns[8][name]': '',
        'columns[8][searchable]': 'true',
        'columns[8][orderable]': 'true',
        'columns[8][search][value]': '',
        'columns[8][search][regex]': 'false',
        'columns[9][data]': '9',
        'columns[9][name]': '',
        'columns[9][searchable]': 'true',
        'columns[9][orderable]': 'true',
        'columns[9][search][value]': '',
        'columns[9][search][regex]': 'false',
        'columns[10][data]': '10',
        'columns[10][name]': '',
        'columns[10][searchable]': 'true',
        'columns[10][orderable]': 'true',
        'columns[10][search][value]': '',
        'columns[10][search][regex]': 'false',
        'columns[11][orderable]': 'true',
        'columns[11][search][value]': '',
        'columns[11][search][regex]': 'false',
        'columns[12][data]': '12',
        'columns[12][name]': '',
        'columns[12][searchable]': 'true',
        'columns[12][orderable]': 'true',
        'columns[12][search][value]': '',
        'columns[12][search][regex]': 'false',
        'columns[13][data]': '13',
        'columns[13][name]': '',
        'columns[13][searchable]': 'true',
        'columns[13][orderable]': 'true',
        'columns[13][search][value]': '',
        'columns[13][search][regex]': 'false',
        'columns[14][data]': '14',
        'columns[14][name]': '',
        'columns[14][searchable]': 'true',
        'columns[14][orderable]': 'false',
        'columns[14][search][value]': '',
        'columns[14][search][regex]': 'false',
        'columns[15][data]': '15',
        'columns[15][name]': '',
        'columns[15][searchable]': 'true',
        'columns[15][orderable]': 'false',
        'columns[15][search][value]': '',
        'columns[15][search][regex]': 'false',
        'start': '0',
        'length': '20',
        'search[value]': '',
        'search[regex]': 'false',
        'query': 'honda',
        'watchListOnly': 'false',
        'freeFormSearch': 'true',
        'page': '0',
        'size': '20'
    }

    var cookie = 'visid_incap_242093=xkACFTEiTNWaPqasMe1J2DfiUF0AAAAAQUIPAAAAAAAqJHatPHhjMNPHl3TavpIp; incap_ses_1179_242093=p33EfO8NNgQRU9MKl6ZcEDfiUF0AAAAAxR/p0aGu2N8yqKAZiIHTCQ==; s_fid=3BFC35D460630745-31354C77F43D45F6; g2usersessionid=c5b2569f1ff735589559c3b0f42c764e; __cfduid=d522c6367c9915be293cba6b34b4ab9991565581886; s_vi=[CS]v1|2EA8711F0503200B-600011826001015B[CE]; G2JSESSIONID=C7C39791E8EB1F0A6DB5D2831578C714-n1; userLang=en; copartTimezonePref=%7B%22displayStr%22%3A%22MDT%22%2C%22offset%22%3A-6%2C%22dst%22%3Atrue%2C%22windowsTz%22%3A%22America%2FDenver%22%7D; timezone=America%2FDenver; s_cc=true; OAGEO=US%7C%7C%7C%7C%7C%7C%7C%7C%7C%7C; usersessionid=1e4a3cac16ebec272c21cc19ed4e1f1e; OAID=066c33f79f0545bf809b8bc28ee2bf58; s_vnum=1568173883429%26vn%3D4; s_invisit=true; s_lv_s=Less%20than%201%20day; s_pv=public%3Ahomepage; s_ppvl=member%253AsearchResults%2C66%2C27%2C712%2C1365%2C712%2C1440%2C900%2C2%2CP; g2app.locationInfo=%7B%22countryCode%22%3A%22US%22%2C%22threeCharCountryCode%22%3A%22USA%22%2C%22stateName%22%3A%22Utah%22%2C%22stateCode%22%3A%22UT%22%2C%22cityName%22%3A%22Sandy%22%2C%22latitude%22%3A40.5794%2C%22longitude%22%3A-111.8816%2C%22zipCode%22%3A%2284070%22%2C%22countyName%22%3A%22Salt%20Lake%22%2C%22countyCode%22%3A%22035%22%2C%22metroName%22%3A%22%22%2C%22metroCode%22%3A%22%22%2C%22accuracy%22%3A%224%22%7D; s_nr=1565592405275-Repeat; s_lv=1565592405277; s_sq=copart-g2-us-prod%3D%2526c.%2526a.%2526activitymap.%2526page%253Dpublic%25253Ahomepage%2526link%253DSearch%2526region%253Dsearch-form%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253Dpublic%25253Ahomepage%2526pidt%253D1%2526oid%253DSearch%2526oidt%253D3%2526ot%253DSUBMIT; s_ppv=public%253Ahomepage%2C66%2C24%2C1390%2C1365%2C712%2C1440%2C900%2C2%2CP'

    var my_headers = {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "content-length": "3492",
        "content-type": "application/json",
        "cookie": "visid_incap_242093=xkACFTEiTNWaPqasMe1J2DfiUF0AAAAAQUIPAAAAAAAqJHatPHhjMNPHl3TavpIp; incap_ses_1179_242093=p33EfO8NNgQRU9MKl6ZcEDfiUF0AAAAAxR/p0aGu2N8yqKAZiIHTCQ==; s_fid=3BFC35D460630745-31354C77F43D45F6; g2usersessionid=c5b2569f1ff735589559c3b0f42c764e; __cfduid=d522c6367c9915be293cba6b34b4ab9991565581886; s_vi=[CS]v1|2EA8711F0503200B-600011826001015B[CE]; G2JSESSIONID=C7C39791E8EB1F0A6DB5D2831578C714-n1; userLang=en; copartTimezonePref=%7B%22displayStr%22%3A%22MDT%22%2C%22offset%22%3A-6%2C%22dst%22%3Atrue%2C%22windowsTz%22%3A%22America%2FDenver%22%7D; timezone=America%2FDenver; s_cc=true; OAGEO=US%7C%7C%7C%7C%7C%7C%7C%7C%7C%7C; usersessionid=1e4a3cac16ebec272c21cc19ed4e1f1e; OAID=066c33f79f0545bf809b8bc28ee2bf58; s_vnum=1568173883429%26vn%3D4; s_invisit=true; s_lv_s=Less%20than%201%20day; s_pv=public%3Ahomepage; s_ppvl=member%253AsearchResults%2C66%2C27%2C712%2C1365%2C712%2C1440%2C900%2C2%2CP; g2app.locationInfo=%7B%22countryCode%22%3A%22US%22%2C%22threeCharCountryCode%22%3A%22USA%22%2C%22stateName%22%3A%22Utah%22%2C%22stateCode%22%3A%22UT%22%2C%22cityName%22%3A%22Sandy%22%2C%22latitude%22%3A40.5794%2C%22longitude%22%3A-111.8816%2C%22zipCode%22%3A%2284070%22%2C%22countyName%22%3A%22Salt%20Lake%22%2C%22countyCode%22%3A%22035%22%2C%22metroName%22%3A%22%22%2C%22metroCode%22%3A%22%22%2C%22accuracy%22%3A%224%22%7D; s_nr=1565592405275-Repeat; s_lv=1565592405277; s_sq=copart-g2-us-prod%3D%2526c.%2526a.%2526activitymap.%2526page%253Dpublic%25253Ahomepage%2526link%253DSearch%2526region%253Dsearch-form%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253Dpublic%25253Ahomepage%2526pidt%253D1%2526oid%253DSearch%2526oidt%253D3%2526ot%253DSUBMIT; s_ppv=public%253Ahomepage%2C66%2C24%2C1390%2C1365%2C712%2C1440%2C900%2C2%2CP",
        "origin": "https://www.copart.com",
        "pragma": "no-cache",
        "referer": "https://www.copart.com/lotSearchResults/?free=true&query=honda",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "x-xsrf-token": "c5345e59-66c6-4fe8-a1b6-7de557a1deab"
    }

    var url = 'https://www.copart.com/public/lots/search'
    // var url = 'https://www.copart.com/lotSearchResults/?free=true&query=honda'


    it ('search for honda', () => {
        // var searchstuff = ['honda', 'toyota', 'GMC', 'subaru', 'ford', 'pinto', 'porsche', 'camry', 'civic', 'mazda']
        // const fs = require('fs')

        request.post({url,
                formdata: formdata,
                headers: my_headers
            }, function(err, response, body){
                    // console.log(response)
                    var jobj = JSON.parse(response.body)
                    var make = jobj.data.query.query[0]
                    var count = jobj.data.results.totalElements
                    console.log( make + " - " + count)
                    // fs.appendFile(data.txt, message + '\n', function (err) {
                    //     if (err) throw err;
                    // })
                }
            )
    })
})



