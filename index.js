//creating a express server
const express = require('express');
let app = express()
//dealing with imported data 
var cors = require('cors')
const bodyparser = require('body-parser')
app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(express.static(__dirname + './server/src'));
//_____________________________________________________________________________
//Create connection,login, & password to db
const{Pool,Client} = require('pg')
const pool =new Pool({
user: "postgres",
host:"localhost",
database:"testdb",
password:"1234",
port: 5432
})

//_________________________________________________________________________
//create table in db
//copy table from csv
// NOTE: only have to do this once for each table 

//attempt 1 (successful) <- use node  <-works, but isnt super insufficient
// pool.query("CREATE TABLE social(id INT, product_id VARCHAR, body VARCHAR , date_written VARCHAR, asker_name VARCHAR, asker_email VARCHAR, reported INT, helpful INT)")
// pool.query(COPY social(id, product_id, body, date_written, asker_name, asker_email, reported, helpful) 
// FROM 'C:\tmp\persons.csv' DELIMITER ',' CSV HEADER)

//attempt 2 (successful)<- use in terminal <- pref
//psql -s testdb
//CREATE TABLE reviewphotos(id INT,review_id VARCHAR ,url VARCHAR);
// COPY reviewphotos
//  FROM '/Users/sterlingbecvar/Desktop/reviews_photos.csv'
// DELIMITER ',' CSV HEADER;
//_________________________________________________________________________
//connect to database
const connectionString = 'postgressql://postgres:1234@localhost:5432/testdb'
const client = new Client({
connectionString:connectionString
})
client.connect()
//__________________________________________________________________________
//create get request for localhost on questions
 app.get('/questions', (req, res) => 
client.query("Select *from question where product_id in ('1')").then((something)=>{return res.send(something)})
)
//create get request for localhost on answers
app.get('/answers', (req, res) => 
client.query("Select *from answer where question_id in ('1')").then((something)=>{return res.send(something)})
)

//create get request for localhost on photos
app.get('/reviewphotos', (req, res) => 
client.query("Select *from reviewphotos where review_id in ('1')").then((something)=>{return res.send(something)}))

//                  #################NOTES#####################
//all
//SELECT * from question or from answer or from reviewphotos
//specific string
//SELECT * from question where product_id in ('1') or any string
//specific INT
//SELECT * from question where id=1
//___________________________________________________________________________
//express server port
let port = 1128;
//localhost:port/(getRequestRoute)
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});