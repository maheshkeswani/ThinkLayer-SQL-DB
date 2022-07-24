const express  = require('express')
const app = express();
const PORT = 5000
const colors  = require('colors')
const router  = express.Router()
const mysql  = require('mysql')
// Create connection
app.use(express.json())
const db = mysql.createConnection({

  host: "localhost",

  user: "root",

  password: "mahesh123"

});

// Connect to MySQL

db.connect((err) => {

if (err) {
throw err
} 
else
{
console.log("MySql Connected...".green.bold); 
}

});
db.query("CREATE DATABASE thinklayer")
db.query("USE thinklayer")
app.post(('/createTable'),(req,res) => {
    let sql  = `CREATE TABLE customer_data (
        NAME varchar(255),
        EMAIL varchar(255),
        Phone varchar(255), 
)`
    db.query(sql,(err,result)=> {
        if(err)
        {
            throw err
        }
        else
        {
            console.log(result);
            res.status(200).json({success : true , message : "Table created"})
        }
    })
})
app.post('/addCustomer',(req,res)=> {
let sql  = `INSERT INTO customer_data SET ?`
let post = {NAME : req.body.name,EMAIL:req.body.email,PHONE:req.body.phone}
    db.query(sql,post,(err,result) => {
        if(err)
        { 
            throw err;
        } 
        else {
            console.log(result);
            res.status(200).json({success : true , message : "Customer Added"})
        }
    })
})
app.delete('/deleteCustomer',(req,res)=> {
    let sql  = `DELETE FROM customer_data WHERE EMAIL = ?`
    const email = req.body.email;
    db.query(sql,[email],(err,result) => {
        if(err)
        {
            throw err;
        }
        else {
            console.log(result);
            res.status(200).json({success : true , message : "Customers with the Given Email are Deleted"})
        }
    })
})
app.get('/customer',(req,res)=> {
    let sql  = `SELECT * FROM customer_data WHERE EMAIL = ?`
    const email  = req.body.email;
    db.query(sql,[email],(err,result) => {
        if(err)
        {
            throw err;
        }
        else {
            console.log(result);
            res.status(200).json({success : true , data : result})
        }
    })
})

app.listen(PORT,()=> {
    console.log(`Server is Running on Port ${PORT}`.yellow.bold)
})
process.on('unhandledRejection',(err)=> {
    console.log(`Error : ${err.message}`)
    process.exit(1)
})