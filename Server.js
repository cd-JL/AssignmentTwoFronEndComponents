const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve your static files (HTML, CSS, and scripts) from the same directory as the server script
app.use(express.static(__dirname));

app.use(express.json());

// Define a route to handle student data insertion
app.post('/addstudent', (req, res) => {
  const newStudent = req.body;

  console.log('Received new student data:', newStudent);

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
