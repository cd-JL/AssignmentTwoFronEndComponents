document.addEventListener("DOMContentLoaded", function () {
    // Function to load and display student data
    function loadStudentData() {
      // Fetch the Students.json file using a relative path to the "data" directory
      fetch('../data/Students.json')
        .then(response => {
          console.log(response); // Add this line to inspect the response
          return response.json();
        })
        .then(data => {
          // Assuming data.students is an array of student objects
          const studentList = data.students;
          
          // Select the <tbody> element where you want to display the data
          const tbody = document.querySelector('table.student-table tbody');
  
          // Loop through the student data and create table rows
          studentList.forEach(student => {
            const row = document.createElement('tr');
            console.log('First Name:', student.first_name);
            console.log('Last Name:', student.last_name);
            console.log('Date of Birth:', student.date_of_birth);
            console.log('Current Grade:', student.current_grade);
  
            // Populate table cells with student data
            row.innerHTML = `
              <td>${student.first_name}</td>
              <td>${student.last_name}</td>
              <td>${student.date_of_birth}</td>
              <td>${student.current_grade}</td>
            `;
  
            // Append the row to the table's <tbody>
            tbody.appendChild(row);
          });
        })
        .catch(error => console.error('Error loading student data:', error));
    }
  
    // Call the loadStudentData function
    loadStudentData();
  });
  