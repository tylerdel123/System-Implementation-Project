const express = require('express');
var connection = require('../database')
var router = express.Router();



//Display every student and attributes
router.get("/", function(request, response, next){
	
    // var query = `SELECT * FROM Student_Classes WHERE StuID = "${someVar}"
	//       `;

    // var query = `SELECT cl.Class_ID, cl.Semester, cl.Semester_Year, cl.Class_Name, t.TeachFirstName, t.TeachLastName, s_c.Grade 
    //       FROM (((Class cl
    //       INNER JOIN Course c ON cl.Course_ID = c.CourseID)
    //       INNER JOIN Teacher t ON t.TeachID = cl.TeachID)
    //       INNER JOIN Student_Classes s_c ON s_c.ClassID = cl.Class_ID)
    //       WHERE s_c.StuID = "${someVar}"
	//       `;
    
          var query = `SELECT cl.Class_ID, cl.Semester, cl.Semester_Year, cl.Class_Name, t.TeachFirstName, t.TeachLastName, s_c.Grade 
          FROM (((Class cl
          INNER JOIN Course c ON cl.Course_ID = c.CourseID)
          INNER JOIN Teacher t ON t.TeachID = cl.TeachID)
          INNER JOIN Student_Classes s_c ON s_c.ClassID = cl.Class_ID)
          WHERE s_c.StuID = "61"
	      `;

	
	connection.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('Student_Page_ViewGrades', {title:'Students Grade Data', action:'list', studentGradeData:data, message:request.flash('success')});
			console.log(data);
            // console.log(JSON.stringify([0].Grade));
            console.log(data[0].Grade);
            
            
            
		}
        
	});
    
});

module.exports = router;