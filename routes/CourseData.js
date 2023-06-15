const express = require('express');
var connection = require('../database')
var router = express.Router();


//Display every teacher and attributes
router.get("/", function(request, response, next){
   
	var query = "SELECT * FROM Course ORDER BY CourseID DESC";

	connection.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('Admin_Page_ManageCourses', {title:'Courses Data', action:'list', courseData:data, message:request.flash('success')});
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

router.get('/delete/:CourseID', function(request, response, next){

	var id = request.params.CourseID; 

	var query = `
	DELETE FROM Course WHERE CourseID = "${id}"
	`;

	connection.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Course Record Successfully Deleted!');
			response.redirect("/CourseData");
			
		}

	});

});

router.get('/logout', function(request, response, next){
    request.session.loggedin = null;
    response.redirect('/LoginData');
  });

module.exports = router;