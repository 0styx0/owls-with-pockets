const mysql = require('mysql2/promise');

async function con() {

  const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'owls-with-pockets',
      password: 'owls-with-pockets',
      database: 'stacks'
  });

  // await connection.execute('INSERT INTO users (username, firstname, lastname, password) VALUES(?, ?, ?, ?)', ['hi', 'no', 'yes', 'yass']);

  return await connection;

  // await connection.connect(function(err) {
  //   if (err) {
  //     return console.error('error: ' + err.message);
  //   }

  //   console.log('Connected to the MySQL server.');
  // });

  // return await connection;
}

export default con();
