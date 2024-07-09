const db = require('../dbConfig.js')

exports.cartSave = (req,res)=>{
    let name = req.body.name
    let type = req.body.type
    let rating = req.body.rating
    let price = req.body.price
    let image = req.body.image
    let unique = req.params.unique

    let values = [[name,type,rating,price,image]]
    let sql = `insert into ${unique}(name,type,rating,price,image) values ?`

    db.query(sql,[values],(err,result)=>{
        if(err) throw err
        else {
            res.send('data sent')
        }
    }) 
}

exports.getCart = (req,res)=>{
    let unique = req.params.unique
    let sql = `select * from ${unique}` 


    db.query(sql,(err,result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}

exports.delete = (req,res)=>{
    let id = req.params.id
    let unique = req.params.unique

    let sql = `delete from ${unique} where id = ?`
    db.query(sql,[id],(err,result)=>{
        if(err) throw err
        else{
            res.send('data deleted')
        }
    })
}