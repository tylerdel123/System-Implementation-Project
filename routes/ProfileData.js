const express = require('express');
var connection = require('../database')
var router = express.Router();


//Display every student and attributes
router.get("/", function(request, response, next){
	
    var query = `SELECT * FROM adminUser WHERE idadminUser = "${someVar}"
	      `;

	connection.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('Admin_Page_MyProfile', { action:'list', profileData:data[0], message:request.flash('success')});
            console.log(data);
            
            // console.log(profileData);

		}
        
	});
    
});

//post 
router.post('/edit/:idadminUser', function(request, response, next){

	var id = request.params.idadminUser;

	var userName = request.body.userName;

	var pwd = request.body.password;

	//console.log(request.body);

	var query = `
	UPDATE adminUser
	SET userName = "${userName}",
	password = "${pwd}"
	WHERE idadminUser = "${id}"
	`;

	connection.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			//request.flash('success', 'Course Record Successfully Updated!');
			response.redirect('/DashboardData');
		}

	});

});


module.exports = router;