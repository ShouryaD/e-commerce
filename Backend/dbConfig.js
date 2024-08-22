const mysql = require('mysql')

let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'ecom',
    password:'1234'
})

module.exports = connection