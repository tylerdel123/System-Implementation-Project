const express = require('express');
var connection = require('../database')
var router = express.Router();
const { setUserIdValue } = require("../server");


router.get("/", function(request, response, next){

	response.render('Student_Page_Login', {message:request.flash('failed'), message2:request.flash('success')});
});



router.post("/login", function(request, response, next){

    var userName = request.body.Username;
    var password = request.body.Password;
    console.log(request.body);
  
  if (userName && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    connection.query('SELECT * FROM Student WHERE StuUsername = ? AND StuPassword = ?', [userName, password], function(error, results, fields) {
      // If there is an issue with the query, output the error
      if (error) throw error;
      // If the account exists
      if (results.length > 0) {
        // Authenticate the user
        request.session.loggedin = true;
        request.session.userName = userName;
        //console.log(request.session.userName);

        //get id from username query
        var query2 = `SELECT StuID FROM Student WHERE StuUsername = "${userName}"
	      `;
        connection.query(query2, function(error, results,){

          if(error)
          {
            throw error; 
          }
          else
          {
            //set users id for global use with function 
            setUserIdValue(results[0].StuID);
            console.log(setUserIdValue);
          }
              
        });

        // Redirect to home page
        response.redirect('/StudentDashboardData');
      } else {
        request.flash('failed', 'Incorrect Username and/or Password!');
        response.redirect('/StudentLogin')
        
      }			
      response.end();
    });
  } else {
    request.flash('failed', 'Please Enter Username or Password!');
    response.redirect('/StudentLogin')
    
    
    response.end();
  }
  });


  
  //logout request
  router.get('/Studentlogout', function(request, response, next){
    request.session.loggedin = null;
    
    request.flash('success', 'Successfully Logged Out!')
    response.redirect('/StudentLogin');
  });




module.exports = router;