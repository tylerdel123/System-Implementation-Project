const express = require('express');
var connection = require('../database')
var router = express.Router();


//Display Student number in database
router.get("/", function(request, response, next){
    
		var query = `SELECT COUNT(Class_ID) As stuID_coloumn FROM Class WHERE TeachID = "${someVar}"
        `;
	connection.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('Teacher_Dashboard', { action:'list', dashboardData:data});
			console.log(data);
		}
        
	});
	
    
});

module.exports = router;