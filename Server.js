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

  // Validate the data and collect validation errors
  const validationErrors = validateStudentData(newStudent);

  if (validationErrors.length > 0) {
    console.error('Invalid student data:', newStudent);
    console.error('Validation errors:', validationErrors);
    res.status(400).json({ errors: validationErrors });
    return;
  }

  // Read the existing students from the Students.json file
  const studentsFilePath = path.join(__dirname, './data/Students.json');
  fs.readFile(studentsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading Students.json file:', err);
      res.status(500).send('Error reading Students.json file');
      return;
    }

    const students = JSON.parse(data);

    // Add the new student to the list if data is valid
    if (newStudent) {
      students.students.push(newStudent);
    }

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

// Function to validate student data and return validation errors
function validateStudentData(studentData) {
  const errors = [];

  if (typeof studentData.first_name !== 'string') {
    errors.push('First name must be a string');
  }

  if (typeof studentData.last_name !== 'string') {
    errors.push('Last name must be a string');
  }

  if (!/^[a-zA-Z]*$/.test(studentData.first_name)) {
    errors.push('First name can only contain letters');
  }

  if (!/^[a-zA-Z]*$/.test(studentData.last_name)) {
    errors.push('Last name can only contain letters');
  }

  if ( typeof studentData.current_grade < 1){
    errors.push('Must be above 1');
  }
  
  if ( typeof studentData.current_grade > 12){
    errors.push('Must be below 12');
  }
  return errors;
}
