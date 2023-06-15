const express = require('express');
var connection = require('../database')
var router = express.Router();


//Display every student and attributes
router.get("/", function(request, response, next){
	
	var query = "SELECT * FROM Student ORDER BY StuID DESC";

	connection.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('Admin_Page_ManageStudents', {title:'Students Data', action:'list', studentData:data, message:request.flash('success')});
			console.log(data);
		}
        
	});
    
});

//search student route
router.post("/search", function(request, response, next){
	
	var name = request.body.name;
	console.log(request.body);

	var query = `SELECT * FROM Student WHERE StuFirstName = "${name}" ORDER BY StuID DESC
	`;
	connection.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('Admin_Page_ManageStudents', {title:'Students Data', action:'list', studentData:data, message:request.flash('success')});
			console.log(data);
		}
        
	});
    
});



//Get student by id to edit
router.get('/edit/:StuID', function(request, response, next){

	var id = request.params.StuID;

	console.log(request.params);

	var query = `SELECT * FROM Student WHERE StuID = "${id}"
	`;

	connection.query(query, function(error, data){

		response.render('Admin_Page_ManageStudents', {title: 'Edit Student Record Data', action:'edit', studentData:data[0]});
	
	});
});

router.post('/edit/:StuID', function(request, response, next){

	var id = request.params.StuID;

	var FirstName = request.body.StuFirstName;

	var LastName = request.body.StuLastName;

	var DoB = request.body.StuDoB;

	var Address = request.body.StuAddress;

	var EmergencyNum = request.body.StuEmergencyNum;

	var Gender = request.body.StuGender;

	var GradeLevel = request.body.StuGradeLevel;

	var UserName = request.body.StuUsername;

	var Password = request.body.StuPassword;
	
	console.log(request.body);

	var query = `
	UPDATE Student
	SET StuFirstName = "${FirstName}",
	StuLastName = "${LastName}",
	StuDoB = "${DoB}",
	StuAddress = "${Address}",
	StuEmergencyNum = "${EmergencyNum}",
	StuGender = "${Gender}",
	StuGradeLevel = "${GradeLevel}",
	StuUsername = "${UserName}",
	StuPassword = "${Password}"
	WHERE StuID = "${id}"
	`;

	connection.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Student Record Successfully Updated!');
			response.redirect('/StudentData');
		}

	});

});

//Get student by id to enroll
router.get('/enroll/:StuID', function(request, response, next){

	var id = request.params.StuID;

	var query = `SELECT cl.Class_ID, cl.Semester, cl.Semester_Year, cl.Class_Name, t.TeachFirstName, t.TeachLastName, c.CourseTitle 
	FROM ((Class cl
	INNER JOIN Course c ON cl.Course_ID = c.CourseID)
	INNER JOIN Teacher t ON t.TeachID = cl.TeachID)
	ORDER BY Class_ID DESC
	`;
	// var query = `SELECT * FROM Class ORDER BY Class_ID ASC
	// `;

	connection.query(query, function(error, data){

		response.render('Admin_Page_ManageStudents', {title: 'Enroll Student Into Course', action:'enroll', id:id, classData:data});
	
	});
});



//post route to handle student enrollment into class           *Finished
router.post('/enroll/:id', function(request, response, next){

	var id = request.params.id;

	var classID = request.body.ClassTitle;
	
	console.log(request.body);

	var query = 'INSERT INTO Student_Classes (ClassID, StuID, Grade) VALUES (?, ?, "0");';

	connection.query(query, [classID, id], function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Student Successfully Enroled Into Class!');
			response.redirect('/StudentData');
		}

	});

});


//Get student by id to view classes enrolled                                                 *Finished
router.get('/classes/:StuID/:StuFirstName/:StuLastName', function(request, response, next){

	var id = request.params.StuID;
	var fName = request.params.StuFirstName;
	var lName = request.params.StuLastName;
	
	var query = `SELECT cl.Class_ID, cl.Semester, cl.Semester_Year, cl.Class_Name, t.TeachFirstName, t.TeachLastName, c.CourseTitle 
	FROM (((Class cl
	INNER JOIN Course c ON cl.Course_ID = c.CourseID)
	INNER JOIN Student_Classes s ON cl.Class_ID = s.ClassID)
	INNER JOIN Teacher t ON t.TeachID = cl.TeachID)
	WHERE s.StuID = "${id}"
	`;

	connection.query(query, function (error, data) {
		if(error)
		{
			throw error;
		}
		else
		{
			response.render('Admin_Page_ManageStudents', { title: 'Classes Enrolled In', action: 'classes', id: id, classData:data, fName:fName, lName:lName });
			//console.log(data);
		}

		});
});

//Drop a students course
router.get('/drop/:id/:Class_ID', function(request, response, next){
	
	var id = request.params.id;
	var cid = request.params.Class_ID;

	//const redirectUrl = `/page2?id=${id}&age=${age}`;

	var query = `
	DELETE FROM Student_Classes WHERE ClassID = "${cid}" AND StuID = "${id}"
	`;

	connection.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Student Class Successfully Dropped!');
			response.redirect("/StudentData");
			
		}

	});

});



router.get('/delete/:StuID', function(request, response, next){

	var id = request.params.StuID; 

	var query = `
	DELETE FROM Student WHERE StuID = "${id}"
	`;

	connection.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Student Record Successfully Deleted!');
			response.redirect("/StudentData");
			
		}

	});

});

module.exports = router;