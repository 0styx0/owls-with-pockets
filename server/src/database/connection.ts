const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'owls-with-pockets',
    password: 'owls-with-pockets',
    database: 'stacks'
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});
