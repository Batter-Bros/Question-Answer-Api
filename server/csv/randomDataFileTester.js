var casual = require('casual');
var fs = require('fs');
const faker = require('faker');
//question
//id: i
//product_id: 5
//casual.date(format = 'YYYY-MM-DD') 
// asker_name: casual.first_name  
//email: casual.email 
//body: casual.word 
//report: casual.day_of_month   
//helpful: casual.day_of_month  
//answer:
//id: i
//question_id: 5
//answer_id: i
//answer_body:casual.word 
//answerer_name: casual.first_name  
//answerer_email:casual.email 
//answer_reported:casual.day_of_month  
//answer_helpful:casual.day_of_month  
//photos:
// id:i
// answer_id: i
// url:casual.url 
var stream = fs.createWriteStream("Question.csv", {flags:'a'});
console.log(new Date().toISOString());
[...Array(100)].forEach( function (item,index) {
    stream.write(index + `,${index}` + casual.populate(`,{{word}},{{email}},{{date}},{{first_name}},{{month_number}},{{month_number}}`) + "\n");
});
console.log(new Date().toISOString());
stream.end();


var stream = fs.createWriteStream("Answer.csv", {flags:'a'});
console.log(new Date().toISOString());
[...Array(100)].forEach( function (item,index) {
    stream.write(index + `,${casual.integer(from = 0, to = 20) }` + `,${casual.integer(from = 0, to = 20)}`+ casual.populate(`,{{email}},{{date}},{{first_name}},{{sentence}},{{month_number}},{{month_number}}`) + "\n");
});
console.log(new Date().toISOString());
stream.end();

var stream = fs.createWriteStream("Photos.csv", {flags:'a'});
console.log(new Date().toISOString());
[...Array(100)].forEach( function (item,index) {
    stream.write(index + `,${casual.integer(from = 0, to = 20) }`+`,${faker.image.imageUrl(400,400,"people")}` + "\n");
});
console.log(new Date().toISOString());
stream.end();





 
