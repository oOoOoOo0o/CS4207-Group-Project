let students = []

window.onload = function() {
    const form = document.getElementById('studentForm');
    form.addEventListener('submit', createStudent);
}

function createStudent(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const course = document.getElementById('course').value;
    const year = parseInt(document.getElementById('year').value) || 1;
    const semester = parseInt(document.getElementById('semester').value) || 1;

    const student = new Student(name, course, year, semester);

    students.push(student)
    displayStudents()
}

function displayStudents() {
    const studentTableBody = document.getElementById('studentTableBody');
    studentTableBody.innerHTML = '';  // Clear previous list

    // If no students, display a message
    if (students.length === 0) {
        studentTableBody.innerHTML = '<tr><td colspan="5">No students created yet.</td></tr>';
        return;
    }

    // Generate the table rows for all students
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.course}</td>
                    <td>${student.year}</td>
                    <td>${student.semester}</td>
                `;
        studentTableBody.appendChild(row);
    });
}