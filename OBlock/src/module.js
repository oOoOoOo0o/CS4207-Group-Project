class Module {

    constructor(code, maxCapacity) {
        this.code = code;
        this.courses = [];
        this.maxCapacity = maxCapacity;
        this.enrolledStudents = [];
        this.requisiteModules = [];
    }
}

function addEnrolledStudent(student, module) {
    if (module.enrolledStudents.length < module.maxCapacity) {
        module.enrolledStudents.push(student);
        return true;
    }
    return false;
}

function removeOverbookings(module) {
    if (module.enrolledStudents.length > module.maxCapacity) {
        module.enrolledStudents.splice(module.maxCapacity);
    }
}

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
        module.courses.push(course);
    }
    displayModules();
}

function removeCourseFromModule(code, course) {
    const module = modules.find(module => module.code === code);
    if (module) {
        module.courses = module.courses.filter(c => c !== course);
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
        removeOverbookings(module);
        displayModules();
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
            <td>${module.enrolledStudents.length}</td>
            <td class="scrollableList">
                <div>${module.enrolledStudents.map(student => `
                    <div style="border-bottom: 1px solid #aaa;">
                        <span>${student.name}</span>
                    </div>
                `).join('')}</div>
            </td>
            <td class="scrollableList">
                <div class="scrollableContent">${module.courses.map(course => `
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #aaa;">
                        <span>${course}</span>
                        <button onclick="removeCourseFromModule('${module.code}', '${course}')">Remove</button>
                    </div>
                `).join('<br>')}</div>
            </td>
            <td class="scrollableList">
                <div class="scrollableContent">${module.requisiteModules.map(requisite => `
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #aaa;">
                        <span>${requisite}</span>
                        <button onclick="removeRequisiteFromModule('${module.code}', '${requisite}')">Remove</button>
                    </div>
                `).join('<br>')}</div>
            </td>
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
            <td>
                <button onclick="addRequisiteToModule('${module.code}')">Add requisite</button>
                <input type="text" id="requisiteToAdd"/>
            </td>
        `;
        moduleTableBody.appendChild(row);
    });

    populateModuleDropdown();
}
