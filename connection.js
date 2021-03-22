const mysql = require('mysql');


exports.connect =()=>{
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hsdb',
    });;
    connection.connect(function (err) {
        (err) ? console.log(err) : console.log(connection);
      });
    return connection;
}

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'kbpqveyq_khoi',
//   password: 'kbpqveyq_khoi2000',
//   database: 'kbpqveyq_hsdb',
//   multipleStatements: true,
// });
