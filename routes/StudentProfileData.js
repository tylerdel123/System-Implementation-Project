const express = require('express');
var connection = require('../database')
var router = express.Router();


//Display every student and attributes
router.get("/", function(request, response, next){
	
    var query = `SELECT * FROM Student WHERE StuID = "${someVar}"
	      `;

	connection.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('Student_Page_MyProfile', { action:'list', StudentprofileData:data[0], message:request.flash('success')});
            console.log(data);
            
            // console.log(profileData);

		}
        
	});
    
});

//post 
router.post('/edit/:StuID', function(request, response, next){

	var id = request.params.StuID;

	var userName = request.body.userName;

	var pwd = request.body.password;

	//console.log(request.body);

	var query = `
	UPDATE Student
	SET StuUsername = "${userName}",
	StuPassword = "${pwd}"
	WHERE StuID = "${id}"
	`;

	connection.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Profile Data Successfully Updated!');
			response.redirect('/StudentProfileData');
		}

	});

});


module.exports = router;