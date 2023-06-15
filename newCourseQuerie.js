var mysql = require('mysql');
async function Query3(cNumber, courseTitle){

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "03Married",
  database: "schoolSystemdb"
});


  var query = 'INSERT INTO Course (CourseNum, CourseTitle) VALUES (?, ?)';;
  let CourseNumbers = cNumber;
  let CourseTitles = courseTitle;
    con.query(query, [CourseNumbers, CourseTitles]), (err, rows) => {
        if (err) throw err;
        
    };
      };
module.exports = {
    Query3
}