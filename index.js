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
//CREATE TABLE question(id INT,product_id VARCHAR,question_body VARCHAR,asker_email VARCHAR,date_written VARCHAR ,asker_name VARCHAR,question_reported INT,question_helpful INT);
//CREATE TABLE answer(id INT,question_id VARCHAR,answer_id VARCHAR,answerer_email VARCHAR,date_written VARCHAR ,answerer_name VARCHAR, answer_body VARCHAR ,answer_reported INT,answer_helpful INT);                                                                                                                                
// copy answer
//  FROM '/Users/sterlingbecvar/express/Question-Answer-Api/server/csv/Answer.csv'
//  DELIMITER ',' CSV HEADER;
// copy reviewphotos
//  FROM '/Users/sterlingbecvar/express/Question-Answer-Api/server/csv/Photos.csv'
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
client.query("Select *from question where product_id in ('3')").then((something)=>{return res.send(something)})
)
//create get request for localhost on answers
app.get('/answers', (req, res) => 
client.query("Select *from answer where question_id in ('3')").then((something)=>{return res.send(something)})
)

//create get request for localhost on photos
app.get('/reviewphotos', (req, res) =>  
 client.query("Select *from reviewphotos where review_id in ('3','5','6')").then((something)=>{return res.send(something)}))

//use join  to join the three tables together
app.get('/joined', (req, res) =>{
  var array = []
  var photos = []
  var quest = client.query("Select *from question where product_id in ('3')").then((something)=>{
  array.push(something.rows)
  })
.then(()=> client.query("Select * from answer where question_id in ('3')"))

  .then((answer)=> 
  array[0].map((each)=> each['answers'] = answer.rows)
  )
  .then(()=> {
    var arr = array[0].map((each)=> each.answers.map((each)=>each.answer_id))
        var string = arr[0].map((each)=> `'${each}'`)
        var splited = string.slice(0,string.length)
        
        return string
   })
   .then((string)=> client.query(`Select * from reviewphotos where review_id in (${string}) `))
   .then((obj)=> photos.push(obj['rows']))
  .then(()=> 
  
  array[0].map((each)=> each.answers.map((photo)=> {
    var arr = []
   var pics = photos[0].map((some)=>{if(some["review_id"]=== photo.answer_id && some !== null && some !== undefined){return arr.push(some)}
   return
  }) 
      return photo['photos'] = arr
}))
  )
  .then((something)=>  res.send(array))
})

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