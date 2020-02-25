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

 //app.get('/questions', (req, res) => 
// client.query("Select *from question where product_id in ('5')").then((something)=>{return res.send(something)})
// )
// //create get request for localhost on answers
// app.get('/answers', (req, res) => 
// client.query("Select *from answer where question_id in ('5')").then((something)=>{return res.send(something)})
// )

//create get request for localhost on photos
app.get('/reviewphotos', (req, res) =>  
client.query("Select *from reviewphotos where review_id in ('5')").then((something)=>{return res.send(something)}))



//use join  to join the three tables together
constcasual = require('casual');

// app.get('/joined', (req, res) =>{
//   var array = []
//   var quest = client.query("Select *from question where product_id in ('5')").then((something)=>{
//   array.push(something.rows)
//   })
// .then(()=> client.query("Select * from answer where question_id in ('5')"))

//   .then((answer)=> 
//   array[0].map((each)=> each['answers'] = answer.rows)
//   )
//   .then(()=> 
//   array[0].map((each)=> each.answers.map((photo)=> photo['photos']= []))
//   )
//   .then(()=>  res.send(array))
// })

// array.map((each)=>{  return each['cool'] = client.query("Select * from answer where question_id in ('5')").then((every)=> every.rows)})
//client.query("Select * from question LEFT JOIN answer ON answer.question_id = question.product_id  LEFT JOIN reviewphotos ON reviewphotos.review_id = answer.question_id where product_id in ('5')").then((something)=>{return res.send(something)}))
// client.query("SELECT  question.product_id, question.body AS questions,question.date_written AS question_date_written, question.asker_name, question.asker_email, question.reported AS question_reported, question.helpful AS question_helpful FROM question LEFT JOIN answer ON answer.question_id = question.product_id where product_id in ('5')").then((something)=>{return res.send(something)}))
//client.query("Select question.body,answer.body from question,answer where question_id in ('5')").then((something)=>{return res.send(something)}))
//client.query("Select * FROM question  where product_id in ('5') UNION SELECT answer AS cool FROM answer where  question_id in ('5') ORDER BY body").then((something)=>{return res.send(something)}))
 //client.query("Select * from question LEFT ANTI JOIN  answer  ON answer.question_id = question.product_id  left outer join  reviewphotos ON reviewphotos.review_id = answer.question_id where product_id in ('5')").then((something)=>{return res.send(something)}))
//client.query("Select * FROM question  where product_id in ('5') UNION SELECT answer AS cool FROM answer where  question_id in ('5') ORDER BY body").then((something)=>{return res.send(something)}))
// client.query("Select * from questions LEFT JOIN answer ON answer.question_id = question.product_id  LEFT JOIN reviewphotos ON reviewphotos.review_id = answer.question_id where review_id in ('5')").then((something)=>{return res.send(something)}))
//client.query("SELECT  question AS questions  FROM question  left outer join answer AS answer ON answer.question_id = question.product_id where product_id in ('5')").then((something)=>{return res.send(something)}))
//client.query("SELECT question.body, answer.body FROM question JOIN answer USING (body)   where product_id in ('5')").then((something)=>{return res.send(something)})) 
//client.query("SELECT * INTO  question from answer WHERE answer.question_id in ('5')").then((something)=>{return res.send(something)}))
// SELECT table_name1.column_name, 
//      table_name2.column_name
// FROM table_name1
// INNER JOIN table_name2 ON join_predicate;
// client.query("SELECT c.body, d.body FROM question AS c , answer AS d  where answer.question_id = question.product_id  product_id in ('5')  GROUP BY GROUPING SETS (c.body,d.body) ").then((something)=>{return res.send(something)}))
// client.query("SELECT t1.body,t2.body FROM  question t1 INNER JOIN answer t2 ON answer.question_id = question.product_id  where product_id in ('5')").then((something)=>{return res.send(something)}))
//  "SELECT * FROM question where product_id in ('1')
// INNER JOIN answer ON answer.question_id" = question.product_id;
// client.query("SELECT  question.product_id, question.body AS question,question.date_written AS question_date_written, question.asker_name, question.asker_email, question.reported AS question_reported, question.helpful AS question_helpful FROM question INNER JOIN answer ON answer.question_id" = question.product_id where product_id in ('5')").then((something)=>{return res.send(something)}))
// client.query("Select * from questions LEFT JOIN answer ON answer.question_id = question.product_id  LEFT JOIN reviewphotos ON reviewphotos.review_id = answer.question_id where review_id in ('5')").then((something)=>{return res.send(something)}))
//client.query("SELECT  question.product_id, question.body AS question,question.date_written AS question_date_written, question.asker_name, question.asker_email, question.reported AS question_reported, question.helpful AS question_helpful FROM question INNER JOIN answer ON answer.question_id" = question.product_id where product_id in ('5')").then((something)=>{return res.send(something)}))
//client.query("Select * from questions LEFT JOIN answer ON answer.question_id = question.product_id  LEFT JOIN reviewphotos ON reviewphotos.review_id = answer.question_id where review_id in ('5')").then((something)=>{return res.send(something)}))
//SELECT(SELECT * FROM question) AS questions FROM question INNER JOIN answer ON question.product_id = answer.question_id   INNER JOIN reviewphotos ON answer.question_id = reviewphotos.review_id     where product_id in ('5')
//"SELECT (SELECT * FROM question) AS questions, (SELECT * FROM answer ON question.product_id = answer.question_id) AS answers, (SELECT * FROM reviewphotos ON answer.question_id = reviewphotos.review_id) FROM question  where product_id in ('5')"
//SELECT question.product_id, question.body AS question,question.date_written AS question_date_written, question.asker_name, question.asker_email, question.reported AS question_reported, question.helpful AS question_helpful   FROM question JOIN answer ON question.product_id = answer.question_id   INNER JOIN reviewphotos ON answer.question_id = reviewphotos.review_id     where product_id in ('5')").then((something)=>{return res.send(something)}))
//client.query("SELECT * ,( SELECT question.product_id, question.body AS question,question.date_written AS question_date_written, question.asker_name, question.asker_email, question.reported AS question_reported, question.helpful AS question_helpful FROM question where product_id in ('5')) As questions   FROM answer where  answer.question_id in ('5')").then((something)=>{return res.send(something)}))
//client.query(""SELECT question.product_id,question.body AS question_body,(CASE WHEN question.product_id=(SELECT question_id" from answer WHERE where product_id in ('5')) THEN  question_id  ELSE 'USA' END)    FROM question where product_id in ('5')").then((something)=>{return res.send(something)}))
// client.query("SELECT question.product_id, question.body AS question,question.date_written AS question_date_written, question.asker_name, question.asker_email, question.reported AS question_reported, question.helpful AS question_helpful   FROM question JOIN answer ON question.product_id = answer.question_id   INNER JOIN reviewphotos ON answer.question_id = reviewphotos.review_id     where product_id in ('5')").then((something)=>{return res.send(something)}))
//client.query("SELECT * ,( SELECT question.body FROM question where product_id in ('5')) As questions   FROM answer where  answer.question_id in ('5')").then((something)=>{return res.send(something)}))
//client.query("SELECT question.product_id,question.body AS question_body,(CASE WHEN question_id=(SELECT question_id FROM answer WHERE  answer.question_id in ('5')) THEN 'cool' END)  FROM question where product_id in ('5')").then((something)=>{return res.send(something)}))



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