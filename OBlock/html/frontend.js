let students = [];
let modules = [];

window.onload = function() {
    const studentCreationForm = document.getElementById('studentForm');
    studentCreationForm.addEventListener('submit', createStudent);
    const moduleCreationForm = document.getElementById('moduleForm');
    moduleCreationForm.addEventListener('submit', createModule);
}

// Student creation & display
function createStudent(event) {
    event.preventDefault();

    const name = document.getElementById('studentName').value;
    const course = document.getElementById('studentCourse').value;
    const year = parseInt(document.getElementById('studentYear').value) || 1;
    const semester = parseInt(document.getElementById('studentSemester').value) || 1;

    const student = new Student(name, course, year, semester);

    students.push(student);
    displayStudents();
}

function removeStudent(id) {
    students = students.filter(student => student.id !== id);
    displayStudents();
}

function displayStudents() {
    const studentTableBody = document.getElementById('studentTableBody');
    studentTableBody.innerHTML = '';

    if (students.length === 0) {
        studentTableBody.innerHTML = '<tr><td colspan="6">No students created yet.</td></tr>';
        return;
    }

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.course}</td>
                    <td>${student.year}</td>
                    <td>${student.semester}</td>
                    <td><button id="deleteButton" onclick="removeStudent(${student.id})">Delete</button></td>
                `;
        studentTableBody.appendChild(row);
    });
}

// Module creation & display
function createModule(event) {
    event.preventDefault();

    const code = document.getElementById('moduleCode').value;
    const capacity = document.getElementById('moduleCapacity').value;

    const module = new Module(code, capacity);

    if (modules.findIndex(module => module.code === code) === -1) {
        modules.push(module);
    } else {
        alert('Module with this code already exists.');
    }
    displayModules();
}

function removeModule(code) {
    modules = modules.filter(module => module.code !== code);
    displayModules();
}

function displayModules() {
    const moduleTableBody = document.getElementById('moduleTableBody');
    moduleTableBody.innerHTML = '';

    if (modules.length === 0) {
        moduleTableBody.innerHTML = '<tr><td colspan="7">No modules created yet.</td></tr>';
        return;
    }

    modules.forEach(module => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td style="width: 10%">${module.code}</td>
            <td style="width: 5%">${module.maxCapacity}</td>
            <td style="width: 5%">${module.enrolledStudents.size}</td>
            <td class="scrollableList">${module.enrolledStudents}</td>
            <td class="scrollableList">${module.compatibleCourses}</td>
            <td class="scrollableList">${module.requisiteModules}</td>
            <td><button id="deleteButton" onclick="removeModule('${module.code}')">Delete</button></td>
        `;
        moduleTableBody.appendChild(row);
    });
}
