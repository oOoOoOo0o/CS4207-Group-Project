class Student {
    static studentCount = 0;

    constructor(name, course, year = 1, semester = 1) {
        this.id = Student.studentCount++;
        this.name = name;
        this.course = course;
        this.year = year;
        this.semester = semester;
        this.paidFees = false; // Default value
        this.completedModuleCodes = [];
    }
}

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

function updateYear(id, newYear) {
    const student = students.find(student => student.id === id);
    if (student) {
        student.year = newYear;
    }
    displayStudents();
}

function updateSemester(id, newSem) {
    const student = students.find(student => student.id === id);
    if (student) {
        student.semester = newSem;
    }
    displayStudents();
}

function togglePaidFees(id) {
    const student = students.find(student => student.id === id);
    if (student) {
        student.paidFees = !student.paidFees;
    }
    displayStudents();
}

function addCompletedModule(id) {
    const code = document.getElementById('completedModuleToAdd').value
    if (code.trim() === '') {
        alert('Module code must not be empty');
        return;
    }

    const student = students.find(student => student.id === id);
    if (student) {
        const module = modules.find(module => module.code === code);
        if (module) {
            student.completedModuleCodes.push(module.code);
        } else {
            alert(`Module not found`);
            return;
        }
    }
    displayStudents();
}

function removeCompletedModule(id, code) {
    const student = students.find(student => student.id === id);
    if (student) {
        student.completedModuleCodes = student.completedModuleCodes.filter(m => m !== code);
    }
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
        let row = document.createElement('tr');
        row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.course}</td>
                    <td>${student.year}</td>
                    <td>${student.semester}</td>
                    <td>${student.paidFees}</td>
                    <td class="scrollableList">
                        <div class="scrollableContent">${student.completedModuleCodes.map(code => `
                            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #aaa;">
                                <span>${code}</span>
                                <button onclick="removeCompletedModule(${student.id}, '${code}')">Remove</button>
                            </div>
                        `).join('<br>')}
                        </div>
                    </td>
                    <td><button class="deleteButton" onclick="removeStudent(${student.id})">Delete</button></td>
                `;
        studentTableBody.appendChild(row);

        row = document.createElement('tr');
        row.innerHTML = `
            <td></td>
            <td></td>
            <td></td>
            <td>
                Edit year
                <input type="number" max="4" value="${student.year}" onchange="updateYear(${student.id}, this.value)" />
            </td>
            <td>
                Edit semester
                <input type="number" max="2" value="${student.semester}" onchange="updateSemester(${student.id}, this.value)" />
            </td>
            <td><button onclick="togglePaidFees(${student.id})">Toggle paid fees</button></td>
            <td>
                <button onclick="addCompletedModule(${student.id})">Add module</button>
                <input type="text" id="completedModuleToAdd"/>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}