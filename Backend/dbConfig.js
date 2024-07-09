const mysql = require('mysql')

let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'ecom',
    password:'Shourya13!'
})

module.exports = connection