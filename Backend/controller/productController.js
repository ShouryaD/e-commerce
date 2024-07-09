let db = require('../dbConfig.js')

exports.send = (req,res)=>{
    let name = req.body.name
    let type = req.body.type
    let rating = req.body.rating
    let price = req.body.price
    let image = req.file.filename

    let values = [[name,type,rating,price,image]]
    let sql = 'insert into product(name,type,rating,price,image) values ?'

    db.query(sql,[values],(err,result)=>{
        if(err) throw err
        else {
            res.send('data sent')
        }
    })
}

exports.delete = (req,res)=>{
    let id = req.params.id
    let sql = 'delete from product where id = ?'
    db.query(sql,[id],(err,result)=>{
        if(err) throw err
        else{
            res.send('data deleted')
        }
    })
}

exports.get = (req,res)=>{
    let sql = 'select * from product'

    db.query(sql,(err,result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}

exports.getProduct = (req,res)=>{
    let id = req.params.id
    let sql = 'select * from product where id = ?'

    db.query(sql,[id],(err,result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}

exports.update = (req,res)=>{

    let id = req.params.id
    let newData = req.body

    let sql = 'update product set ? where id = ?'

    db.query(sql,[newData,id],(err,result)=>{
        if(err) throw err
        else{
            res.send('data updated')
        }
    })
}

exports.searchData = (req,res)=>{
    let input = req.params.input
    let sql = 'select * from product where name like ?'

    db.query(sql, ['%'+ input + '%'], (err,result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}

