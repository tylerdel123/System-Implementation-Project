var mysql = require('mysql');
async function Query2(fName, lName, DoB, address, eNum, gender){

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

  var query = 'INSERT INTO Teacher (TeachFirstName, TeachLastName, TeachDoB, TeachAddress, TeachContactNum, TeachGender, TeachUsername, TeachPassword) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';;
  let TeacherFirstName = fName;
  let TeacherLastName = lName;
  let TeacherDoB = DoB;
  let TeacherAddress = address;
  let TeacherContactNum = eNum;
  let TeacherGender = gender;
  let Username1 = createUsername(TeacherFirstName, TeacherLastName);
  let Pwd = randomPasswordGenerator(TeacherLastName);
    con.query(query, [TeacherFirstName, TeacherLastName, TeacherDoB, TeacherAddress, TeacherContactNum, TeacherGender, Username1, Pwd]), (err, rows) => {
        if (err) throw err;
};
//console.log("Insert was a Success") //Beta Development process data
};

module.exports = {
    Query2
}