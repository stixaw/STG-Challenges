const request = require('request')
const assert = require('chai').assert

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

var cookie = 'visid_incap_242093=4Z/SPswTTw+5j3HICG76BE+5nF0AAAAAQUIPAAAAAACeiAsMIHCg0zYgvljKE/Bq; g2app.locationInfo=%7B%22countryCode%22%3A%22USA%22%2C%22countryName%22%3A%22United%20States%22%2C%22stateName%22%3A%22Utah%22%2C%22stateCode%22%3A%22UT%22%2C%22cityName%22%3A%22Draper%22%2C%22latitude%22%3A40.5081%2C%22longitude%22%3A-111.8692%2C%22zipCode%22%3A%2284020%22%2C%22timeZone%22%3A%22-06%3A00%22%7D; s_fid=33C758192FBD46E5-3BB39BE2C170508B; _ga=GA1.2.747051588.1570552146; s_vi=[CS]v1|2ECE5CA885036EBA-400011896000CA80[CE]; OAID=14fa60bf705275c9fcfdbe336ad131a2; __gads=ID=8e84be9b1fd2df1f:T=1570552145:S=ALNI_Ma3UsM7DwswHGkMCYXXEE7PGXhX7g; _fbp=fb.1.1570552147337.869795338; __cfduid=dffc39b3540349460a8c87cbe441533211570552169; g2usersessionid=b059377eb1fae1b858f4e810aca4e1db; G2JSESSIONID=0D40E06009EFD77F4506EF9A758CE43A-n2; userLang=en; incap_ses_415_242093=FltFGgrD8irNAnjBQWLCBeIMnl0AAAAAY9FZmveEKAjRwuKddblFBQ==; _gid=GA1.2.635885473.1570639075; _gat=1; copartTimezonePref=%7B%22displayStr%22%3A%22MDT%22%2C%22offset%22%3A-6%2C%22dst%22%3Atrue%2C%22windowsTz%22%3A%22America%2FDenver%22%7D; timezone=America%2FDenver; s_depth=1; s_vnum=1573144145583%26vn%3D2; s_invisit=true; s_lv_s=Less%20than%207%20days; s_cc=true; OAGEO=US%7C%7C%7C%7C%7C%7C%7C%7C%7C%7C; usersessionid=79423db72fe159b4ef3a425b9e423f26; s_pv=member%3AsearchResults; s_ppvl=public%253Ahomepage%2C77%2C25%2C946%2C1920%2C945%2C1920%2C1080%2C1%2CP; s_ppv=member%253AsearchResults%2C36%2C36%2C945%2C1920%2C945%2C1920%2C1080%2C1%2CP; s_nr=1570639126708-Repeat; s_lv=1570639126710; s_sq=copart-g2-us-prod%3D%2526c.%2526a.%2526activitymap.%2526page%253Dmember%25253AsearchResults%2526link%253DSearch%2526region%253Dsearch-form%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253Dmember%25253AsearchResults%2526pidt%253D1%2526oid%253DSearch%2526oidt%253D3%2526ot%253DSUBMIT'

var my_headers = {
  "Content-Type": "application/json",
  "X-XSRF-TOKEN": "18bc1362-0eb5-4778-a784-f68ca0bfece3",
  "origin": "https://www.copart.com",
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
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

describe('Challenge 9', () => {
  it('search for models using rest api', async () => {
    var searchlist = ["volkswagen", "honda", "toyota", "nissan", "camry", "acura", "GMC", "ford", "econo"]
    // var searchlist = ["honda"]
    var lotNumStr
    var ln
    var mkn

    for (var i = 0; i < searchlist.length; i++) {
      formBody.query = searchlist[i]
      // console.log(formBody.query)

      request.post(
        url,
        {
          formData: formBody,
          headers: my_headers
        },
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var results = JSON.parse(response.body)
            console.log(results.data.query.query[0] + " - " + results.data.results.totalElements)

            var firstContent = results.data.results.content[0]
            lotNumStr = firstContent['lotNumberStr']
            console.log(typeof (lotNumStr) === 'string')
            ln = firstContent['ln']
            console.log(typeof (ln) === 'number')
            mkn = firstContent['mkn']
            console.log(typeof (mkn) === 'string')
          }
          assert.equal(typeof (lotNumStr), 'string')
          assert.equal(typeof (ln), 'number')
          assert.equal(typeof (mkn), 'string')
        }
      );
    }

  });
})