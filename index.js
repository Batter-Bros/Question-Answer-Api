//express server
const express = require('express');
let app = express()
var cors = require('cors')
const bodyparser = require('body-parser')
// const bigFile = require('./questions.csv')
const Papa = require("papaparse")
app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(express.static(__dirname + './server/src'));
//______________________________________________________
//testing rn 
// const{Pool,Client} = require('pg')
// const connectionString = 'postgressql://postgres:PostgreSQL 12@localhost:5432/testdb'
// const client = new Client({
// connectionString:connectionString
// })
// client.connect()
// client.query('SELECT * from ',(err,res)=>{console.log(err,res)})
const{Pool,Client} = require('pg')
const pool =new Pool({
user: "postgres",
host:"localhost",
database:"testdb",
password:"1234",
port: 5432
})
// pool.query("CREATE TABLE social(id INT, product_id VARCHAR, body VARCHAR , date_written VARCHAR, asker_name VARCHAR, asker_email VARCHAR, reported INT, helpful INT)")


// pool.query(COPY social(id, product_id, body, date_written, asker_name, asker_email, reported, helpful) 
// FROM 'C:\tmp\persons.csv' DELIMITER ',' CSV HEADER)

// COPY question
//  FROM '/Users/sterlingbecvar/Desktop/questions.csv'
// DELIMITER ',' CSV HEADER;



const connectionString = 'postgressql://postgres:1234@localhost:5432/testdb'
const client = new Client({
connectionString:connectionString
})
client.connect()



//______________________________________________________
// app.use(express.static('index.html'))
//send something to the page
// app.get('/', (req, res) => res.send(Papa.parse(bigFile)))
app.get('/', (req, res) => 
client.query('SELECT * from question').then((something)=>{return res.send(something)})
)



let port = 1128;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});