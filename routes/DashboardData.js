const express = require('express');
var connection = require('../database')
var router = express.Router();


//Display Student number in database
router.get("/", function(request, response, next){
    
		var query = "SELECT (SELECT COUNT(StuID)FROM Student) As stuID_coloumn, (SELECT COUNT(TeachID)FROM Teacher) As teachID_coloumn, (SELECT COUNT(CourseID)FROM Course) As courseID_coloumn";
	connection.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('Admin_Dashboard', { action:'list', dashboardData:data});
			console.log(data);
		}
        
	});
	
    
});

module.exports = router;