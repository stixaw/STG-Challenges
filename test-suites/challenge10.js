const request = require('request')
const assert = require('chai').assert
const csv = require('csv-parser')
const fs = require('fs')
const csv_helper = require('../helpers/fsHelpers')

var url = "https://www.copart.com/public/lots/search"

var formBody = {
  "columns[0][data]": "0",
  "columns[0][name]": "",
  "columns[0][orderable]": "false",
  "columns[0][search][regex]": "false",
  "columns[0][search][value]": "",
  "columns[0][searchable]": "true",
  "columns[10][data]": "10",
  "columns[10][name]": "",
  "columns[10][orderable]": "true",
  "columns[10][search][regex]": "false",
  "columns[10][search][value]": "",
  "columns[10][searchable]": "true",
  "columns[11][data]": "11",
  "columns[11][name]": "",
  "columns[11][orderable]": "true",
  "columns[11][search][regex]": "false",
  "columns[11][search][value]": "",
  "columns[11][searchable]": "true",
  "columns[12][data]": "12",
  "columns[12][name]": "",
  "columns[12][orderable]": "true",
  "columns[12][search][regex]": "false",
  "columns[12][search][value]": "",
  "columns[12][searchable]": "true",
  "columns[13][data]": "13",
  "columns[13][name]": "",
  "columns[13][orderable]": "true",
  "columns[13][search][regex]": "false",
  "columns[13][search][value]": "",
  "columns[13][searchable]": "true",
  "columns[14][data]": "14",
  "columns[14][name]": "",
  "columns[14][orderable]": "false",
  "columns[14][search][regex]": "false",
  "columns[14][search][value]": "",
  "columns[14][searchable]": "true",
  "columns[15][data]": "15",
  "columns[15][name]": "",
  "columns[15][orderable]": "false",
  "columns[15][search][regex]": "false",
  "columns[15][search][value]": "",
  "columns[15][searchable]": "true",
  "columns[1][data]": "1",
  "columns[1][name]": "",
  "columns[1][orderable]": "false",
  "columns[1][search][regex]": "false",
  "columns[1][search][value]": "",
  "columns[1][searchable]": "true",
  "columns[2][data]": "2",
  "columns[2][name]": "",
  "columns[2][orderable]": "true",
  "columns[2][search][regex]": "false",
  "columns[2][search][value]": "",
  "columns[2][searchable]": "true",
  "columns[3][data]": "3",
  "columns[3][name]": "",
  "columns[3][orderable]": "true",
  "columns[3][search][regex]": "false",
  "columns[3][search][value]": "",
  "columns[3][searchable]": "true",
  "columns[4][data]": "4",
  "columns[4][name]": "",
  "columns[4][orderable]": "true",
  "columns[4][search][regex]": "false",
  "columns[4][search][value]": "",
  "columns[4][searchable]": "true",
  "columns[5][data]": "5",
  "columns[5][name]": "",
  "columns[5][orderable]": "true",
  "columns[5][search][regex]": "false",
  "columns[5][search][value]": "",
  "columns[5][searchable]": "true",
  "columns[6][data]": "6",
  "columns[6][name]": "",
  "columns[6][orderable]": "true",
  "columns[6][search][regex]": "false",
  "columns[6][search][value]": "",
  "columns[6][searchable]": "true",
  "columns[7][data]": "7",
  "columns[7][name]": "",
  "columns[7][orderable]": "true",
  "columns[7][search][regex]": "false",
  "columns[7][search][value]": "",
  "columns[7][searchable]": "true",
  "columns[8][data]": "8",
  "columns[8][name]": "",
  "columns[8][orderable]": "true",
  "columns[8][search][regex]": "false",
  "columns[8][search][value]": "",
  "columns[8][searchable]": "true",
  "columns[9][data]": "9",
  "columns[9][name]": "",
  "columns[9][orderable]": "true",
  "columns[9][search][regex]": "false",
  "columns[9][search][value]": "",
  "columns[9][searchable]": "true",
  "draw": "1",
  "freeFormSearch": "true",
  "length": "20",
  "page": "0",
  "query": "honda",
  "search[regex]": "false",
  "search[value]": "",
  "size": "20",
  "start": "0",
  "watchListOnly": "false"
}

var cookie = 's_fid=3BFC35D460630745-31354C77F43D45F6; __cfduid=d522c6367c9915be293cba6b34b4ab9991565581886; s_vi=[CS]v1|2EA8711F0503200B-600011826001015B[CE]; OAID=066c33f79f0545bf809b8bc28ee2bf58; g2app.locationInfo=%7B%22countryCode%22%3A%22US%22%2C%22threeCharCountryCode%22%3A%22USA%22%2C%22stateName%22%3A%22Utah%22%2C%22stateCode%22%3A%22UT%22%2C%22cityName%22%3A%22Sandy%22%2C%22latitude%22%3A40.5794%2C%22longitude%22%3A-111.8816%2C%22zipCode%22%3A%2284070%22%2C%22countyName%22%3A%22Salt%20Lake%22%2C%22countyCode%22%3A%22035%22%2C%22metroName%22%3A%22%22%2C%22metroCode%22%3A%22%22%2C%22accuracy%22%3A%224%22%7D; g2app.searchResultsPageLength=100; visid_incap_242093=xkACFTEiTNWaPqasMe1J2DfiUF0AAAAAQ0IPAAAAAACAtbOPAUIHcUNsuF64OkbSe+3oAnxQWqAS; _ga=GA1.2.1879390003.1571692199; __gads=ID=898431106960e754:T=1571692199:S=ALNI_MZJvucp01R-MFpZ5wcbeHGk9RSWIA; g2usersessionid=e1719a0c957899ec65cb43c82aa62a1a; G2JSESSIONID=48EF98E07718D64FA3B74322ABD4AE9E-n1; userLang=en; copartTimezonePref=%7B%22displayStr%22%3A%22MST%22%2C%22offset%22%3A-7%2C%22dst%22%3Afalse%2C%22windowsTz%22%3A%22America%2FDenver%22%7D; timezone=America%2FDenver; s_cc=true; OAGEO=US%7C%7C%7C%7C%7C%7C%7C%7C%7C%7C; usersessionid=b8d4872aca78e4e741920941deb62716; _gcl_au=1.1.1736289808.1581038463; _gid=GA1.2.521915029.1581038463; _fbp=fb.1.1581038463440.1184972542; s_ppvl=public%253Ahomepage%2C67%2C19%2C727%2C1440%2C726%2C1440%2C900%2C2%2CP; s_pv=member%3AsearchResults; s_vnum=1583630460395%26vn%3D2; s_invisit=true; s_lv_s=Less%20than%201%20day; s_ppv=member%253AsearchResults%2C67%2C10%2C726%2C1440%2C726%2C1440%2C900%2C2%2CP; incap_ses_1179_242093=jahuIr8J1DmAuRrzuaZcECXOPF4AAAAAEuno5+9XkzuaVzUUhEoU6w==; s_nr=1581043251734-Repeat; s_lv=1581043251736; s_sq=copart-g2-us-prod%3D%2526c.%2526a.%2526activitymap.%2526page%253Dmember%25253AsearchResults%2526link%253DSearch%2526region%253Dsearch-form%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253Dmember%25253AsearchResults%2526pidt%253D1%2526oid%253DSearch%2526oidt%253D3%2526ot%253DSUBMIT'

var my_headers = {
  "Content-Type": "application/json",
  "X-XSRF-TOKEN": "18bc1362-0eb5-4778-a784-f68ca0bfece3",
  "origin": "https://www.copart.com",
  "X-Requested-With": "XMLHttpRequest",
  "cookie": cookie
}
/*
    “query: honda”
    
    The results returned will look like this:
    {"returnCode":1,"returnCodeDesc":"Success","data":{"query":{"query":["toyota camry"],"page":0,"size":20,
    "start":0,"watchListOnly":false,"freeFormSearch":true,"hideImages":false,"defaultSort":false,
    "specificRowProvided":false},"results":{"totalElements":5090,"content":[{"lotNumberStr":"31429677",
    "ln":31429677,"mkn":"TOYOTA","lm":"CAM……

    Notice one of the items in the data is totalElements.  This tells you how many items are in the search results.  

    Then run another query for “nissan skyline”.  The results might or might not return anything.  
    Output how many in the results are found.  Do this w/ 10 different search parameters of your favorite cars.
*/

describe('Challenge 10', () => {
  it('search list created from csv file', async () => {
    // const searchList = ["volkswagen", "honda", "toyota", "nissan", "camry", "acura", "GMC", "ford", "econo"]
    // const searchList = ["honda"]

    let search_term

    const searchList = await csv_helper.searchList('/Users/angel.williams/dev/STGNodeChallenges/STG-Challenges/test-suites/challenge10.csv')

    for (var i = 0; i < searchList.length; i++) {
      const dict_make = searchList[i]['make'].toString()
      const dict_model = searchList[i]['model'].toString()
      const dict_year = searchList[i]['year'].toString()
      const dict_type = searchList[i]['Vehicle type'].toString()

      if (dict_make !== '') {
        search_term = `${dict_make} `
      }
      if (dict_model !== '') {
        search_term = `${search_term} ${dict_model} `
      }
      if (dict_year !== '') {
        search_term = `${search_term} ${dict_year} `
      }
      if (dict_type !== '') {
        search_term = `${search_term} ${dict_type} `
      }

      // console.log(search_term)
      formBody.query = search_term
      console.log('FORM: ', formBody.query)

      request.post(
        url,
        {
          formData: formBody,
          headers: my_headers
        },
        function (error, response, body) {
          let lotNumStr
          let ln
          let mkn
          if (!error && response.statusCode == 200) {
            var results = JSON.parse(response.body)
            console.log(results.data.query.query[0] + " - " + results.data.results.totalElements)

            // var firstContent = results.data.results.content[0]
            // lotNumStr = firstContent['lotNumberStr']
            // ln = firstContent['ln']
            // mkn = firstContent['mkn']
          }
          // assert.equal(typeof (lotNumStr), 'string')
          // assert.equal(typeof (ln), 'number')
          // assert.equal(typeof (mkn), 'string')
        }
      )
      search_term = ''
    }
  })
})