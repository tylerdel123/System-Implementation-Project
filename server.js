const express = require("express"),
  app = express();
const bodyParser = require('body-parser');
const database = require('./newStudentQuerie');
const databaseTeacherQuerie = require('./newTeacherQuerie');
const databaseCourseQuerie = require('./newCourseQuerie');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');


//Connect to my database
var connection = require('./database')

app.use(express.static('public'))

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// Set Cookie Parser, sessions and flash
app.use(cookieParser('NotSoSecret'));
app.use(session({
  secret : 'something',
  // cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}));
app.use(flash());



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

function setUserIdValue(value) {
  someVar = value;
  console.log("The user id of the user trying to log in is " + someVar);
}
module.exports = { setUserIdValue };





//Route to Login data in Login_Page to login
const queryLoginRouter = require('./routes/LoginData');
app.use('/LoginData', queryLoginRouter);

// Put Auth function in these when ready to publish on real server

//Route to dashoard data in Admin_Dashboard Page to view data
const queryDashboardRouter = require('./routes/DashboardData');
app.use('/DashboardData', queryDashboardRouter);

//Route to fetch Students data in Admin_ManageStudents Page to edit, enroll, and delete
const queryStudentsRouter = require('./routes/StudentData');
app.use('/StudentData', queryStudentsRouter);

//Route to fetch Students data in Admin_ManageTeachers Page to edit, enroll, and delete
const queryTeachersRouter = require('./routes/TeacherData');
app.use('/TeacherData', queryTeachersRouter);

//Route to fetch Coures data in Admin_ManageCourses Page to edit, enroll, and delete
const queryCoursesRouter = require('./routes/CourseData');
app.use('/CourseData', queryCoursesRouter);

//Route to fetch Classes data in Admin_Classes Page to edit, add, and delete
const queryClassesRouter = require('./routes/ClassData');
app.use('/ClassData', queryClassesRouter);

//Route to Admin profile Page
const queryProfileRouter = require('./routes/ProfileData');
app.use('/ProfileData', queryProfileRouter);


//Student Page Routes
const queryStudentLoginRouter = require('./routes/StudentLogin');
app.use('/StudentLogin', queryStudentLoginRouter);

const queryStudentDashboardRouter = require('./routes/StudentDashboardData');
app.use('/StudentDashboardData', queryStudentDashboardRouter);

const queryStudentGradesRouter = require('./routes/StudentGradeData');
app.use('/StudentGradeData', queryStudentGradesRouter);

const queryStudentProfileRouter = require('./routes/StudentProfileData');
app.use('/StudentProfileData', queryStudentProfileRouter);


//Teacher Page Routes
const queryTeacherLoginRouter = require('./routes/TeacherLogin');
app.use('/TeacherLogin', queryTeacherLoginRouter);

const queryTeacherDashboardRouter = require('./routes/TeacherDashboardData');
app.use('/TeacherDashboardData', queryTeacherDashboardRouter);

const queryTeacherGradesRouter = require('./routes/TeacherGradeData');
app.use('/TeacherGradeData', queryTeacherGradesRouter);


//a function to prevent unwanted users from using the system
function auth(req, res, next) {
  if (req.session.loggedin) {
  next()
  } else {
    req.flash('failed', 'Must be Logged in First!');
    res.redirect('/LoginData')
  }
}



//post new student data
app.post("/newStudent", async (req, res) => {
    let fName = req.body.fName;
    let lName = req.body.lName;
    let DoB = req.body.DoB;
    let address = req.body.address;
    let eNum = req.body.eNum;
    let gender = req.body.gender;
    let gradeL = req.body.gradeL;
    console.log(req.body)
    await database.Query(fName, lName, DoB, address, eNum, gender, gradeL)
        function waitForQuery(){
          setTimeout( function(){
            req.flash('success', 'Student Record Successfully Added!');
        res.redirect("/StudentData");
          }, 100 );
        }

        waitForQuery();
});

//post new Teachers data
app.post("/newTeacher", async (req, res) => {
    let fName = req.body.fName;
    let lName = req.body.lName;
    let DoB = req.body.DoB;
    let address = req.body.address;
    let eNum = req.body.eNum;
    let gender = req.body.gender;
    console.log(req.body)
    await databaseTeacherQuerie.Query2(fName, lName, DoB, address, eNum, gender)
    function waitForQuery(){
      setTimeout( function(){
        req.flash('success', 'Teacher Record Successfully Added!');
    res.redirect("/TeacherData");
      }, 100 );
    }

    waitForQuery();
    
});

app.post("/newCourse", async (req, res) => {
    let cNumber = req.body.CourseNum;
    let courseTitle = req.body.CourseTitle;
    console.log(req.body)
    await databaseCourseQuerie.Query3(cNumber, courseTitle)
    function waitForQuery(){
      setTimeout( function(){
        req.flash('success', 'Course Successfully Added!');
    res.redirect("/CourseData");
      }, 100 );
    }

    waitForQuery();
});



//route for Admin dashboard change for Beta phase
// app.get("/", function (req, res) {
//   res.render("Admin_Dashboard");
// });

//route to fetch login page first
app.get("/", function (req, res) {
  res.render("Login_Page");
});

// app.get("/Login_Page", function (req, res) {
//   res.render("Login_Page");
// });

// app.get("/Admin_Dashboard", function (req, res) {
//     res.render("Admin_Dashboard");
// });

app.get("/Admin_Page_AddCourse", /*auth,*/ function (req, res) {
  res.render("Admin_Page_AddCourse");
});

// app.get("/Admin_Page_ManageCourses", function (req, res) {
//     res.render("Admin_Page_ManageCourses");
// });

//Render Admins Manage Students page
app.get("/Admin_Page_ManageStudents", function (req, res) {
  res.render("Admin_Page_ManageStudents");
});

app.get("/Admin_Page_AddStudent", /*auth,*/ function (req, res) {
    res.render("Admin_Page_AddStudent");
});

// app.get("/Admin_Page_ManageTeachers", function (req, res) {
//     res.render("Admin_Page_ManageTeachers");
// });

app.get("/Admin_Page_AddTeacher", /*auth,*/ function (req, res) {
    res.render("Admin_Page_AddTeacher");
});
  


app.listen(8080, function () {
  console.log("Server is running on port 8080 ");
});