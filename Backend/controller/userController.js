let db = require('../dbConfig.js')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')


function generateToken(user){
    return jwt.sign({id: user.id},process.env.JWT, {expiresIn:'1h'})
}

exports.signUp =async (req,res)=>{
    let name = req.body.name
    let userName = req.body.userName
    let email = req.body.email
    let password = req.body.password
    let hash = await bcrypt.hash(password,10)
    let image = req.file.filename

    let values = [[name, userName, email, hash, image]]

    let sql = 'insert into UserLogin(name,userName, email, password, image) values ?' 

    db.query(sql, [values], (err, result)=>{
        if(err) throw err
        else{
            console.log('data submitted')
        }
    })
}

exports.userLogin = (req,res)=>{
    let email = req.body.email
    // let userName = req.body.userName
    let password = req.body.password

    let sql = 'select * from UserLogin where (email = ? or userName = ?)'

    db.query(sql, [email,email], (err,result)=>{
        console.log(result)
        if(err) throw err
        else{
            // if(result.length > 0){
            //     res.send(true)
            // }
            // else{
            //     res.send(false)
            // }
        bcrypt.compare(password,result[0].password,async (err,isMatch)=>{
            if(err) throw err
            else{
                if(isMatch==true){
                    let token = await generateToken(result[0])
                    console.log(token)
                    res.json({isMatch,token})
                }
                else{
                    res.send(false)
                }
            }
        })
        }
    })
}

exports.clientTable = (req,res)=>{
    let unique = req.params.unique

    let clientTable = `
CREATE TABLE IF NOT EXISTS ${unique}(
    ID INT NOT NULL AUTO_INCREMENT,
    image VARCHAR(255),
    name VARCHAR(255),
    type VARCHAR(255),
    rating VARCHAR(255),
    price VARCHAR(255),
    PRIMARY KEY (ID)
)`

db.query(clientTable, (err, result)=>{
    if(err) throw err
    else{
        console.log('unique table created')
    }
}) 
}

exports.getClient = (req,res)=>{
    let unique = req.params.unique
    let sql = `select * from userlogin where email = ?`

    db.query(sql,[unique + '@gmail.com'],(err,result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}