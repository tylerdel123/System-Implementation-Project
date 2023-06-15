const express = require('express');
var connection = require('../database')
var router = express.Router();


//Display every class and attributes
router.get("/", function(request, response, next){
   
    var query = `SELECT cl.Class_ID, cl.Semester, cl.Semester_Year, cl.Class_Name, t.TeachFirstName, t.TeachLastName, c.CourseTitle 
	FROM ((Class cl
	INNER JOIN Course c ON cl.Course_ID = c.CourseID)
	INNER JOIN Teacher t ON t.TeachID = cl.TeachID)
	ORDER BY Class_ID DESC
	`;
	

	connection.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('Admin_Page_Classes', {title:'CLass Data', action:'list', classData:data, message:request.flash('success')});
		}
        
	});

    
});

router.get('/add', function(request, response, next){


    var query = "SELECT * FROM Teacher, Course";
	

	connection.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('Admin_Page_Classes', {title:'Add Class Form', action:'add', classData:data, message:request.flash('success')});
		}
        
	});

});



//Get teacher by id to edit
router.get('/edit/:CourseID', function(request, response, next){

	var id = request.params.CourseID;

	console.log(request.params);

	var query = `SELECT * FROM Course WHERE CourseID = "${id}"
	`;

	connection.query(query, function(error, data){

		response.render('Admin_Page_ManageCourses', {title: 'Edit Course Record Data', action:'edit', courseData:data[0]});
	
	});
});

router.post('/edit/:CourseID', function(request, response, next){

	var id = request.params.CourseID;

	var courseNumber = request.body.CourseNum;

	var courseTitle = request.body.CourseTitle;

	console.log(request.body);

	var query = `
	UPDATE Course
	SET CourseNum = "${courseNumber}",
	CourseTitle = "${courseTitle}"
	WHERE CourseID = "${id}"
	`;

	connection.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Course Record Successfully Updated!');
			response.redirect('/CourseData');
		}

	});

});

//Router to delete class                                           *Finished
router.get('/delete/:Class_ID', function(request, response, next){

	var id = request.params.Class_ID; 

	var query = `
	DELETE FROM Class WHERE Class_ID = "${id}"
	`;

	connection.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Course Record Successfully Deleted!');
			response.redirect("/ClassData");
			
		}

	});

});

router.get('/logout', function(request, response, next){
    request.session.loggedin = null;
    response.redirect('/LoginData');
  });

module.exports = router;