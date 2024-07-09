let db = require('../dbConfig.js')

exports.adminSave = (req,res)=>{
    let email = req.body.email
    let password = req.body.password
    let value = [[email,password]]
    let sql = 'insert into ADMIN(EMAIL,PASSWORD) values ?'

    db.query(sql,[value],(err,result)=>{
        if(err) throw err
        else res.send('data saved')
    })
}

exports.adminLogin = (req,res)=>{
    let email = req.body.email
    let password = req.body.password

    let sql = 'select * from ADMIN where email = ? and password = ?'

    db.query(sql,[email,password], (err,result)=>{
        if(err) throw err
        else{
            if(result.length > 0){
                res.send(true)
            }
            else res.send(false)
        }
    })
}