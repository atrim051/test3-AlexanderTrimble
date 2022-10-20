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
      if (students.length == 0) {
        reject('No Results Returned');
      }
      resolve(students);
    });
  };
  
  module.exports.highGPA = function () {
    return new Promise((resolve, reject) => {
        let highestGPA;
        if (students.length == 0) {
          reject('No Results Returned');
        }
        for (let i = 0; i < students.length; i++){
            for (let j = i + 1; j < students.length; j++) {
                if (students[j].gpa > students[i].gpa){
                    highestGPA = students[j];
                }
            }
        }
        resolve(highestGPA);
      });
    };

    module.exports.allStudents = () =>{
      return new Promise((resolve, reject) => {
        if (students.length == 0) {
          reject('No Results Returned');
        }
        resolve(students);
      });
    };