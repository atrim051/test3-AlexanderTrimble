const fs = require('fs');
const { resolve } = require('path');
let students = [];

module.exports.prep = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/students.json', (err, data) => {
      if (err) {
        reject("unable to read file");
      }
      students = JSON.parse(data);
      resolve();
    });
  });
};

module.exports.cpa = function () {
  return new Promise((resolve, reject) => {
    let results = students.filter(student => student.program == "CPA");
    (results.length == 0) ? reject("No CPA students.") : resolve(results);
  });
};

module.exports.highGPA = function () {
  return new Promise((resolve, reject)=>{
    let high = 0;
    let highStudent;
    
    for (let i=0; i<students.length; i++)
    {
        //console.log(students[i].gpa, high);
        if (students[i].gpa > high)
        {
            high = students[i].gpa;
            highStudent = students[i];
        }
    }
    (highStudent) ? resolve(highStudent): reject("Failed finding student with highest GPA");
}); 
};

module.exports.allStudents = () => {
  return new Promise((resolve, reject) => {
    if (students.length == 0) {
      reject('No Results Returned');
    }
    resolve(students);
  });
};

module.exports.addStudent = function (studentData) {
  return new Promise((resolve, reject) => {

    studentData.push(employeeData);
    resolve(
      `Employee #${studentData.id} has been added successfully!`
      );
    });
  };