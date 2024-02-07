
const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'bymnmcqxjefqme4meshj-mysql.services.clever-cloud.com',
    user: 'u4ni2476ossgpkei',
    password: 'mQ73m4IjPEgCu0happFB',
    database: 'bymnmcqxjefqme4meshj',


});
  
//Database Notify
db.getConnection((err) =>  {

  if (err) {
      console.error('Error connecting to MySQL:', err);

  }else {
      console.log('Connected to  MySQL');
  }
});


  module.exports = db;




















