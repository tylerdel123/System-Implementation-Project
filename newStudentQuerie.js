const { request, response } = require('express');
var mysql = require('mysql');
async function Query(fName, lName, DoB, address, eNum, gender, gradeL){

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "03Married",
  database: "schoolSystemdb"
});

//create username function
function createUsername (u1, u2){
  var firstName = u1.substring(0, 4);
  var lastName = u2.substring(0, 5);
  var finalUsername = firstName + lastName;
    return finalUsername;
}

//create a random password function
function randomPasswordGenerator(u1) {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var passwordLength = 5;
  var lastName = u1.substring(0, 5);
  var password = "";
  for (var i = 0; i <= passwordLength; i++) {
 var randomNumber = Math.floor(Math.random() * chars.length);
 password += chars.substring(randomNumber, randomNumber +1);
 
}
return lastName + password;
}

  var query = 'INSERT INTO Student (StuFirstName, StuLastName, StuDoB, StuAddress, StuEmergencyNum, StuGender, StuGradeLevel, StuUsername, StuPassword) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';;
  let studentFirstName = fName;
  let studentLastName = lName;
  let studentDoB = DoB;
  let studentAddress = address;
  let studentEmercencyContact = eNum;
  let studentGender = gender;
  let studentGradeLevel = gradeL;
  let username1 = createUsername(studentFirstName, studentLastName);
  let pwd = randomPasswordGenerator(studentLastName);
    con.query(query, [studentFirstName, studentLastName, studentDoB, studentAddress, studentEmercencyContact, studentGender, studentGradeLevel, username1, pwd]), (err, rows, req, res) => {
        if (err) throw err
        req.flash('success', 'Student Record Successfully Added!');
        res.redirect("/StudentData");;
       
};
     
};

module.exports = {
    Query
}