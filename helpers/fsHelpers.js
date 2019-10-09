const fastcsv = require('fast-csv')
const csv = require('csv-parser')
const fs = require('fs')
const searchlist = []

fs.readFile('challenge10.csv', 'utf8', function (err, data) {
  searchlist = data.split(/\r?\n/)
  console.log('1 ', searchlist)
})

fs.readFile('challenge10.csv', function (err, data) {
  csv(data, { columns: false, trim: true }, function (err, rows) {
    searchlist.push(data)
  })
  console.log('3 ', searchlist)
})

fs.createReadStream('challenge10.csv')
  .pipe(csv())
  .on('data', (row) => {
    searchlist.push(row)
  })
  .on('end', () => {
    console.log('2 ', searchlist)
  })