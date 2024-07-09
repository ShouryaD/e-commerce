let db = require('../dbConfig.js')
let bcrypt = require('bcryptjs')

exports.adminSave =async (req,res)=>{
    let email = req.body.email
    let password = req.body.password
    let hash = await bcrypt.hash(password,7)
    let value = [[email,hash]]
    let sql = 'insert into ADMIN(EMAIL,PASSWORD) values ?'

    db.query(sql,[value],(err,result)=>{
        if(err) throw err
        else res.send('data saved')
    })
}

exports.adminLogin = (req,res)=>{
    let email = req.body.email
    let password = req.body.password

    let sql = 'select * from ADMIN where email = ?'
    db.query(sql,[email], (err,result)=>{
        if(err) throw err
        else{
            // if(result.length > 0){
            //     res.send(true)
            // }
            // else res.send(false)
            // console.log(result[0].PASSWORD)
            bcrypt.compare(password,result[0].PASSWORD,(err,isMatch)=>{
                if(err) throw err
                else{
                    if(isMatch == true){
                        res.send(true)
                    }
                    else res.send(false)
                }
            })
        }
    })
}