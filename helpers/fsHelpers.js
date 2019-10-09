const csv = require('csv-parser')
const fs = require('fs')

const searchList = (csvFile) => new Promise(function (resolve) {
  let sl = []
  fs.createReadStream(csvFile)
    .pipe(csv())
    .on('data', (data) => {
      sl.push(data)
    })
    .on('end', () => {
      resolve(sl)
    })
})

module.exports = {
  searchList
}