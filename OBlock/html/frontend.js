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
                    <td><button class="deleteButton" onclick="removeStudent(${student.id})">Delete</button></td>
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

function updateCapacity(code, newCapacity) {
    const module = modules.find(module => module.code === code);
    if (module) {
        module.maxCapacity = newCapacity;
    }
    displayModules();
}

function addCourseToModule(code) {
    const course = document.getElementById('courseToAdd').value
    if (course.trim() === '') {
        alert('Course name must not be empty');
        return;
    }

    const module = modules.find(module => module.code === code);
    if (module) {
        module.compatibleCourses.push(course);
    }
    displayModules();
}

function removeCourseFromModule(code, course) {
    const module = modules.find(module => module.code === code);
    if (module) {
        module.compatibleCourses = module.compatibleCourses.filter(c => c !== course);
    }
    displayModules();
}

function addRequisiteToModule(code) {
    const course = document.getElementById('requisiteToAdd').value
    if (course.trim() === '') {
        alert('Requisite module code must not be empty');
        return;
    }

    const module = modules.find(module => module.code === code);
    if (module) {
        module.requisiteModules.push(course);
    }
    displayModules();
}

function removeRequisiteFromModule(code, requisite) {
    const module = modules.find(module => module.code === code);
    if (module) {
        module.requisiteModules = module.requisiteModules.filter(r => r !== requisite);
    }
    displayModules();
}

function pruneModuleOverbookings(code) {
    const module = modules.find(module => module.code === code);
    if (module) {
        module.removeOverbookings();
    }
}

function displayModules() {
    const moduleTableBody = document.getElementById('moduleTableBody');
    moduleTableBody.innerHTML = '';

    if (modules.length === 0) {
        moduleTableBody.innerHTML = '<tr><td colspan="7">No modules created yet.</td></tr>';
        return;
    }

    modules.forEach(module => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${module.code}</td>
            <td>${module.maxCapacity}</td>
            <td>${module.enrolledStudents.size}</td>
            <td class="scrollableList">${Array.from(module.enrolledStudents).join('<br>')}</td>
            <td class="scrollableList">${module.compatibleCourses.map(course => `
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span>${course}</span>
                        <button onclick="removeCourseFromModule('${module.code}', '${course}')">Remove</button>
                    </div>
                `).join('<br>')}</td>
            <td class="scrollableList">${module.requisiteModules.map(requisite => `
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span>${requisite}</span>
                        <button onclick="removeRequisiteFromModule('${module.code}', '${requisite}')">Remove</button>
                    </div>
                `).join('<br>')}</td>
            <td><button class="deleteButton" onclick="removeModule('${module.code}')">Delete</button></td>
        `;
        moduleTableBody.appendChild(row);

        row = document.createElement('tr');
        row.innerHTML = `
            <td></td>
            <td>
                Edit capacity
                <input type="number" value="${module.maxCapacity}" onchange="updateCapacity('${module.code}', this.value)" />
            </td>
            <td></td>
            <td><button class="deleteButton" onclick="pruneModuleOverbookings('${module.code}')">Prune Overbookings</button></td>
            <td>
                <button onclick="addCourseToModule('${module.code}')">Add course</button>
                <input type="text" id="courseToAdd"/>
            </td>
            <td class="scrollableList">
                <button onclick="addRequisiteToModule('${module.code}')">Add requisite</button>
                <input type="text" id="requisiteToAdd"/>
            </td>
        `;
        moduleTableBody.appendChild(row);
    });
}
