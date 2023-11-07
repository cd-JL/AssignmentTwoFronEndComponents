document.addEventListener("DOMContentLoaded", function () {
    const studentForm = document.getElementById("student-form");
  
    studentForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Log a message when the submit button is pressed
      console.log("Submit button pressed");
  
      // Get form data
      const formData = new FormData(studentForm);
      const studentData = {};
  
      formData.forEach((value, key) => {
        studentData[key] = value;
      });
  
      // Send the student data to the server
      fetch('/addstudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          // You can redirect or display a success message here
        })
        .catch((error) => console.error('Error:', error));
    });
  });
  