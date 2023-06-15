var mysql = require('mysql')
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "03Married",
    database: "schoolSystemdb",
})

connection.connect((err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Database Successfully Connected')
})
module.exports = connection