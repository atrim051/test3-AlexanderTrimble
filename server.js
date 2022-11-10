/*************************************************************************
* WEB322– Test 3
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy. No part * of this assignment has been copied manually or electronically from any
other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Alexander Trimble Student ID: 144365160 Date: 2022-10-02
*
* Your app’s URL (from Cyclic) :https://git.heroku.com/dry-tundra-94944.git
*
*************************************************************************/

// var HTTP_PORT = process.env.PORT || 8080;
// var express = require("express");
// var app = express();
// var path = require("path");
// var data = require("./data_prep.js");
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));



// function onHTTPStart() {
//     console.log('Express http server listening on: ' + HTTP_PORT);
// }

// // setup a 'route' to listen on the default url path
// app.get("/", (req, res) => {
//     var resTxt = `<h2>Declaration</h2><p>I acknowledge the College's academic integrity policy - and my own integrity - remain in 
//     effect whether my work is done remotely or onsite. Any test or assignmnet is an act of trust between me and my instructor, and 
//     especially with my classmates... even when no one is watching. I declare I will not break that trust </p>
//     <p>Name: <mark>Alexander Trimble</mark></p>
//     <p>Student Number: <mark>144365160</mark>
//     <p><a href=/CPA>Click to vist CPA Students</a></p>
//     <p><a href=/highGPA>Click to see who has the highest GPA</a></p>
//     <p><a href=/allStudents>Click to see all students</a></p>
//     <p><a href=/addStudent>Click to add a student</a></p>`
//     res.send(resTxt);
// });

// app.get("/addStudent", (req, res) => {
//     res.sendFile(path.join(__dirname, "/test4_views/addStudent.html"));
// });


// app.get("/allStudents", (req, res) => {
//     data
//         .allStudents()
//         .then((data) => {
//             res.json(data);
//         })
//         .catch((err) => {
//             res.json({ message: err });
//         })
// });

// app.get("/student/:value", (req, res) => {
//     var resTxt = `<h2>The Student Information</h2>
//     <p>Student id: ${res.json(data)}</p>
//     <p><a href=/allStudents>Show All Students</a></p>
//     <p><a href=/>Go Home</a></p>`
//     data
//     .getStudent(req.params.value)
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.json({ message: err });
//     });
//   });

// app.get("/CPA", (req, res) => {
//     data
//         .cpa()
//         .then((data) => {
//             res.json(data);
//         })
//         .catch((err) => {
//             res.json("ERROR");
//         });
// });

// app.get('/highGPA', (req, res) => {
//     data
//         .highGPA()
//         .then((data) => {
//             res.json(data);
//         })
//         .catch((err) => {
//             res.json("ERROR");
//         });
// });


// app.post("/addStudent", (req, res) => {
//     var resTxt1 = `<h2>The New Student Information</h2>
//     <p>Student id: ${data.stuID}</p>
//     <p><a href=/allStudents>Show All Students</a></p>
//     <p><a href=/>Go Home</a></p>`
    
//     data
//         .addStudent(req.body)
//         .then(res.send(resTxt1))
//         .catch(function (err) {
//             res.json("ERROR");
//         });
// });

// app.use(function (req, res) {
//     res.status(404).send('Page Not Found');
//   });

// data
//     .prep()
//     .then(function () {
//         app.listen(HTTP_PORT, onHTTPStart);
//     })
//     .catch(function (err) {
//         console.log('No Data. Failed to start.' + err);
//     });
var express = require("express");

var app = express();

var data_prep = require("./data_prep.js");

var path = require("path");



app.use(express.json());

app.use(express.urlencoded({extended: true}));



var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() 

{

    console.log("Express http server listening on " + HTTP_PORT);

}



app.get("/",(req,res)=>{

    let resText = "<h2>Declaration (text size in heading 2): </h2> ";

    resText += "<p> The rest text is displayed in paragraph as shown in screenshot. </p>";

    resText += " <p> I acknowledge the College’s academic integrity policy – and my own integrity ";

    resText += "– remain in effect whether my work is done remotely or onsite.";

    resText += " Any test or assignment is an act of trust between me and my instructor, ";

    resText += " and especially with my classmates… even when no one is watching.";

    resText += " I declare I will not break that trust. </p>";

    resText += "<p>Name: <mark> <b> highlight Your Real Name </b> </mark> </p>";

    resText += "<p>Student Number: <mark><b> highlight Your Real Student Number </b> </mark> </p>";

    

    resText += `<ul>

                <li> <a href = "/CPA"> CPA Students </a></li>

                <li> <a href = "/highGPA"> Highest GPA </a></li>

                <li> <a href = "/allStudents"> All Students </a></li>

                <li> <a href = "/addStudent"> Add A New Student </a></li>

                <li> Note: Locate specific student by student Id, e.g., <br>

                 http://localhost:8080/student/3 </li>

                `



    res.send(resText);

});



app.get("/BSD", (req,res)=>{

    data_prep.bsd().then((data)=>{

        res.json(data);

    }).catch((reason)=>{

        res.json({message:reason});

    });

});



app.get("/CPA", (req,res)=>{

    data_prep.cpa().then((data)=>{

        res.json(data);

    }).catch((reason)=>{

        res.json({message:reason});

    });

});



app.get("/highGPA", (req, res)=>{

    data_prep.highGPA().then((data)=>{

        let resText = `<h2> Highest GPA: </h2>

        <p> Student ID: ${data.studId} </p>

        <p> Name:  ${data.name} </p>

        <p> Program: ${data.program} </p>

        <p> GPA: ${data.gpa} </p> `;

        res.send(resText);

    });

});



app.get("/allStudents", (req, res)=>{

    data_prep.allStudents().then((data)=>{

        res.json(data);

    }).catch((reason)=>res.json({message:reason}));

});



app.get("/addStudent", (req, res)=>{

    res.sendFile(path.join(__dirname, "/test3_views/addStudent.html"));

});



app.post("/addStudent", (req, res)=>{

    data_prep.addStudent(req.body).then(()=>{

        var data = req.body;

        var txt =  ` <h2 style="color:red;"> The New Student Information  </h2>

        <p> Student id: ${data.studId}</p>

         <p> Student name: ${data.name} </p>

        <p> Program: ${data.program} </p>

        <p> GPA: ${data.gpa} </p>

        <a href="/allStudents"> All Students </a> <br>

        <a href="/"> Go Home </a>

        `;

        res.send(txt);

        //res.redirect("/allStudents");



    }).catch((reason)=>res.json({message:reason}));

});



app.get("/student/:studId",(req, res)=>{

    data_prep.getStudent(req.params.studId).then((data)=>{

        var txt = `

        <h2 style="color:red;"> This Student Information  </h2>

        <p> Student id: ${data.studId}</p>

        <p> Student name: ${data.name} </p>

        <p> Program: ${data.program} </p>

        <p> GPA: ${data.gpa} </p>

        <a href="/allStudents"> Show All Students </a> <br>

        <a href="/"> Go Home </a>

        `;

        res.send(txt);

       // res.json(data);

       // {"studId":3,"name":"name3","program":"BSD","gpa":3.3}

    }).catch((reason)=>res.json({message:reason}));

});



app.get("*", (req, res)=>{

    res.status(404).send("Error 404: page not found.")

});



data_prep.prep().then((data)=>{

    //console.log(data);

    app.listen(HTTP_PORT, onHttpStart);

}).catch((err)=>{

    console.log(err);

});