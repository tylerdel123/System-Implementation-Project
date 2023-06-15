const express = require('express');
var connection = require('../database');
var router = express.Router();

router.get("/", function(request, response, next){
   

    // var query = `SELECT * FROM Class Where TeachID = "${someVar}"
    //     `;

        var query = `SELECT cl.Class_ID, cl.Semester, cl.Semester_Year, cl.Class_Name, c.CourseNum
	FROM ((Class cl
	INNER JOIN Course c ON cl.Course_ID = c.CourseID)
	INNER JOIN Teacher t ON t.TeachID = cl.TeachID)
	Where cl.TeachID = "${someVar}"
        `;

	connection.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('Teacher_Page_ManageGrades', {title:'Class Data', action:'list', GradeData:data, message:request.flash('success')});
		}
        
	});

    
});


router.get("/view/:Class_ID", function(request, response, next){
   

    // var query = `SELECT * FROM Class Where TeachID = "${someVar}"
    //     `;
    var id = request.params.Class_ID;


    
        var query = `SELECT s.StuFirstName, s.StuLastName
        FROM ((Class cl
        INNER JOIN Student_Classes s_c ON s_c.ClassID = cl.Class_ID)
        INNER JOIN Student s ON s.StuID = s_c.StuID)
        Where cl.Class_ID = "${id}"
        ORDER BY s.StuLastName ASC;
        `;

	connection.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('Teacher_Page_ManageGrades', {title:'Student Data', action:'Student_roster', StudentData:data, message:request.flash('success')});
		}
        
	});

    
});


router.get("/grades/:Class_ID", function(request, response, next){
   

    // var query = `SELECT * FROM Class Where TeachID = "${someVar}"
    //     `;
    var id = request.params.Class_ID;


    
        var query = `SELECT cl.Class_ID, s.StuFirstName, s.StuLastName, s_c.Grade, s.StuID
        FROM ((Class cl
        INNER JOIN Student_Classes s_c ON s_c.ClassID = cl.Class_ID)
        INNER JOIN Student s ON s.StuID = s_c.StuID)
        Where cl.Class_ID = "${id}"
        ORDER BY s.StuLastName ASC;
        `;

	connection.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('Teacher_Page_ManageGrades', {title:'Student Grade Data', action:'Student_Grades', StudentGradeData:data, message:request.flash('success')});
		}
        
	});

    
});


router.get("/editGrade/:Class_ID/:StuID", function(request, response, next){
   

    var classID = request.params.Class_ID;
    var stuID = request.params.StuID;
    
        var query = `SELECT s.StuID, s_c.Grade, cl.Class_ID
        FROM ((Class cl
        INNER JOIN Student_Classes s_c ON s_c.ClassID = cl.Class_ID)
        INNER JOIN Student s ON s.StuID = s_c.StuID)
        Where cl.Class_ID = "${classID}" AND s.StuID = "${stuID}"
        `;

	connection.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('Teacher_Page_ManageGrades', {title:'Student Grade Data', action:'Edit_Student_Grades', StudentGradeData:data[0], message:request.flash('success')});
		}
        
	});

    
});

router.post('/editGrade/:Class_ID/:StuID/end', function(request, response, next){

	var classID = request.params.Class_ID;
    var stuID = request.params.StuID;
    var grade = request.body.Grade;

	var query = `
	UPDATE Student_Classes
	SET Grade = "${grade}"
	Where ClassID = "${classID}" AND StuID = "${stuID}"
	`;

	connection.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Student Grade Successfully Updated!');
			// response.redirect('/TeacherGradeData');
            response.redirect(`/TeacherGradeData/grades/${classID}`);
		}

	});

});



module.exports = router;