const express = require('express');
var connection = require('../database')
var router = express.Router();


//Display every teacher and attributes
router.get("/", function(request, response, next){

	var query = "SELECT * FROM Teacher ORDER BY TeachID DESC";

	connection.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('Admin_Page_ManageTeachers', {title:'Teachers Data', action:'list', teacherData:data, message:request.flash('success')});
		}
        
	});
    
});

//Get teacher by id to edit
router.get('/edit/:TeachID', function(request, response, next){

	var id = request.params.TeachID;

	console.log(request.params);

	var query = `SELECT * FROM Teacher WHERE TeachID = "${id}"
	`;

	connection.query(query, function(error, data){

		response.render('Admin_Page_ManageTeachers', {title: 'Edit Teacher Record Data', action:'edit', teacherData:data[0]});
	
	});
});

router.post('/edit/:TeachID', function(request, response, next){

	var id = request.params.TeachID;

	var FirstName = request.body.TeachFirstName;

	var LastName = request.body.TeachLastName;

	var DoB = request.body.TeachDoB;

	var Address = request.body.TeachAddress;

	var EmergencyNum = request.body.TeachContactNum;

	var Gender = request.body.TeachGender;

	var Username = request.body.TeachUsername;

	var Pwd = request.body.TeachPassword;

	console.log(request.body);

	var query = `
	UPDATE Teacher
	SET TeachFirstName = "${FirstName}",
	TeachLastName = "${LastName}",
	TeachDoB = "${DoB}",
	TeachAddress = "${Address}",
	TeachContactNum = "${EmergencyNum}",
	TeachGender = "${Gender}",
	TeachUsername = "${Username}",
	TeachPassword = "${Pwd}"
	WHERE TeachID = "${id}"
	`;

	connection.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Teacher Record Successfully Updated!');
			response.redirect('/TeacherData');
		}

	});

});

router.get('/delete/:TeacherID', function(request, response, next){

	var id = request.params.TeacherID; 

	var query = `
	DELETE FROM Teacher WHERE TeachID = "${id}"
	`;

	connection.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Teacher Record Successfully Deleted!');
			response.redirect("/TeacherData");
			
		}

	});

});

module.exports = router;