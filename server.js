/*************************************************************************
* WEB322– Test 3
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy. No part * of this assignment has been copied manually or electronically from any
other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Alexander Trimble Student ID: 144365160 Date: 2022-10-02
*
* Your app’s URL (from Cyclic) :https://odd-ruby-antelope-toga.cyclic.app/
*
*************************************************************************/

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path");
var data = require("./data_prep.js");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));



function onHTTPStart() {
    console.log('Express http server listening on: ' + HTTP_PORT);
}

// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    var resTxt = `<h2>Declaration</h2><p>I acknowledge the College's academic integrity policy - and my own integrity - remain in 
    effect whether my work is done remotely or onsite. Any test or assignmnet is an act of trust between me and my instructor, and 
    especially with my classmates... even when no one is watching. I declare I will not break that trust </p>
    <p>Name: <mark>Alexander Trimble</mark></p>
    <p>Student Number: <mark>144365160</mark>
    <p><a href=/CPA>Click to vist CPA Students</a></p>
    <p><a href=/highGPA>Click to see who has the highest GPA</a></p>
    <p><a href=/allStudents>Click to see all students</a></p>
    <p><a href=/addStudent>Click to add a student</a></p>`
    res.send(resTxt);
});

app.get("/addStudent", (req, res) => {
    res.sendFile(path.join(__dirname, "/test3_views/addStudent.html"));
});


app.get("/allStudents", (req, res) => {
    data
        .allStudents()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        })
});

app.get("/student/:value", (req, res) => {
    data
    .getStudent(req.params.value)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
  });

app.get("/CPA", (req, res) => {
    data
        .cpa()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json("ERROR");
        });
});

app.get('/highGPA', (req, res) => {
    data
        .highGPA()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json("ERROR");
        });
});


app.post("/addStudent", (req, res) => {
    var resTxt = `<h2>The New Student Information</h2>
    <p>Student id: ${data.stuID}</p>
    <p><a href=/allStudents>Show All Students</a></p>
    <p><a href=/>Go Home</a></p>`
    
    data
        .addStudent(req.body)
        .then(res.send(resTxt))
        .catch(function (err) {
            res.json("ERROR");
        });
});

app.use(function (req, res) {
    res.status(404).send('Page Not Found');
  });

data
    .prep()
    .then(function () {
        app.listen(HTTP_PORT, onHTTPStart);
    })
    .catch(function (err) {
        console.log('No Data. Failed to start.' + err);
    });