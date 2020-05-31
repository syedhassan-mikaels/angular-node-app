const mysql = require('mysql');

const dbConfig = require('../config/db');

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) throw err;
  console.log('You are now connected with mysql database...');
});

module.exports = connection;
