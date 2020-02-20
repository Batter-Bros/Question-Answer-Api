
const{Pool,Client} = require('pg')
const pool =new Pool({
user: "postgres",
host:"localhost",
database:"testdb",
password:"1234",
port: 5432
})
pool.query("CREATE TABLE social(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)",(err,res)=>{console.log(err,res)})
const connectionString = 'postgressql://postgres:1234@localhost:5432/testdb'
const client = new Client({
connectionString:connectionString
})
client.connect()
client.query('SELECT * from id',(err,res)=>{console.log(err,res)})