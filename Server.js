const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(express.json());

// Define a route to handle student data insertion
app.post('/addstudent', (req, res) => {
  const newStudent = req.body;

  // Log the received student data
  console.log('Received new student data:', newStudent);

  // Validate the data
  const validationErrors = validateStudentData(newStudent);
  if (validationErrors.length > 0) {
    res.status(400).json({ errors: validationErrors });
    return;
  }

  // Explicitly parse current_grade as an integer
  newStudent.current_grade = parseInt(newStudent.current_grade);

  // Read the existing students from the Students.json file
  const studentsFilePath = path.join(__dirname, './data/Students.json');
  fs.readFile(studentsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading Students.json file:', err);
      res.status(500).send('Error reading Students.json file');
      return;
    }

    const students = JSON.parse(data);

    // Add the new student to the list
    students.students.push(newStudent);

    // Write the updated student data back to the file
    fs.writeFile(studentsFilePath, JSON.stringify(students, null, 2), (err) => {
      if (err) {
        console.error('Error writing to Students.json file:', err);
        res.status(500).send('Error writing to Students.json file');
        return;
      }

      console.log('Student added successfully');
      res.status(200).send('Student added successfully');
    });
  });
});

app.get('*', (req, res) => {
  const html = fs.readFileSync('addstudent.html', 'utf-8');
  res.send(html);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Function to validate student data
function validateStudentData(studentData) {
  const errors = [];

  if (typeof studentData.first_name !== 'string' || !/^[a-zA-Z]*$/.test(studentData.first_name)) {
    errors.push('First name is invalid');
  }

  if (typeof studentData.last_name !== 'string' || !/^[a-zA-Z]*$/.test(studentData.last_name)) {
    errors.push('Last name is invalid');
  }

  const currentGrade = parseInt(studentData.current_grade);
  if (isNaN(currentGrade) || currentGrade < 1 || currentGrade > 12) {
    errors.push('Current grade is invalid. It should be a number between 1 and 12.');
  }

  console.log(errors);
  return errors;
}
