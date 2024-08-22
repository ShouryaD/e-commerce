const express = require('express')
const db = require('./dbConfig.js')
const route = require('./route/productRoute.js')
const adminRoute = require('./route/adminRoute.js')
const cartRoute = require('./route/cartRoute.js')
const userRoute = require('./route/userRoute.js')

const cors = require('cors')
const dotenv = require('dotenv')


let app = express()
app.use(express.json())
app.use(cors())
// app.use(express.static('public')) used for ejs
app.use(express.static('uploads'))

let localhost = '127.0.0.1'

dotenv.config({
    path:'./.env'
})

let adminTable = `
CREATE TABLE IF NOT EXISTS ADMIN(
    ID INT NOT NULL AUTO_INCREMENT,
    EMAIL VARCHAR(255),
    PASSWORD VARCHAR(255),
    PRIMARY KEY (ID)
)
`
let cartTable = `
CREATE TABLE IF NOT EXISTS Cart(
    ID INT NOT NULL AUTO_INCREMENT,
    image VARCHAR(255),
    name VARCHAR(255),
    type VARCHAR(255),
    rating VARCHAR(255),
    price VARCHAR(255),
    PRIMARY KEY (ID)
)
`
let productTable = `
create table if not exists product(
    id int not null auto_increment,
    name varchar(255),
    type varchar(255),
    rating varchar(255),
    price varchar(255),
    image varchar(255),
    primary key(id)
)
`
db.connect((err)=>{
    if(err) throw err
    else{
        console.log('database connected')
    }
})

let userTable = `
CREATE TABLE IF NOT EXISTS UserLogin(
    ID INT NOT NULL AUTO_INCREMENT,
    image VARCHAR(255),
    name VARCHAR(255),
    userName VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY (ID)
)
`
db.query(productTable, (err, result)=>{
    if(err) throw err
    else console.log('Product table created')
})
db.query(userTable, (err, result)=>{
    if(err) throw err
    else console.log('User Login table created')
})

db.query(adminTable,(err,result)=>{
    if(err) throw err
    else console.log('Admin table created')
})
db.query(cartTable,(err,result)=>{
    if(err) throw err
    else console.log('Cart table created')
})




app.use('/api', route)
app.use('/api', adminRoute)
app.use('/api', cartRoute)
app.use('/api', userRoute)

app.listen(process.env.PORT,localhost,()=>{
    console.log(`Server started at http://${localhost}:${process.env.PORT}`)
})